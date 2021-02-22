import { Ordering, OrderingEvents } from './2-ordering';
import {
    Side,
    UnidentifiedTrade,
    min,
    OpenOrder,
    OpenMaker,
    Length,
} from './interfaces';
import { Frozen } from './manager-open-makers';
import Big from 'big.js';

class Taken extends Ordering {
    protected uTradeShouldTakeOpenOrder(
        trade: UnidentifiedTrade, maker: OpenOrder,
    ): boolean {
        return (
            maker.side === Side.BID &&
            trade.side === Side.ASK &&
            trade.price.lte(maker.price)
            ||
            maker.side === Side.ASK &&
            trade.side === Side.BID &&
            trade.price.gte(maker.price)
        );
    }

    protected uTradeTakesOrderQueue(
        uTrade: UnidentifiedTrade, maker: OpenMaker,
    ): void {
        const volume = min(uTrade.quantity, maker.behind);
        uTrade.quantity = uTrade.quantity.minus(volume);
        maker.behind = maker.behind.minus(volume);
    }

    protected uTradeTakesOpenMaker(
        uTrade: UnidentifiedTrade, maker: OpenMaker,
    ): [Big, Big, Frozen] {
        if (maker.behind.gt(0)) return [
            new Big(0),
            new Big(0),
            {
                margin: new Big(0),
                position: new Big(0),
                length: Length.LONG, // meaningless
            },
        ];
        const volume = min(uTrade.quantity, maker.unfilled);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        uTrade.quantity = uTrade.quantity.minus(volume);
        const toThaw = this.openMakers.takeOrder(maker.id, volume, dollarVolume);
        return [volume, dollarVolume, toThaw];
    }

    protected uTradeTakesOpenMakers(uTrade: UnidentifiedTrade) {
        uTrade = { ...uTrade };
        let totalVolume = new Big(0);
        for (const order of this.openMakers.values())
            if (this.uTradeShouldTakeOpenOrder(uTrade, order)) {
                const [volume] = this.uTradeTakesOpenMaker(uTrade, order);
                totalVolume = totalVolume.plus(volume);
            }
        return totalVolume;
    }

    public updateTrades(uTrades: UnidentifiedTrade[]) {
        super.updateTrades(uTrades);
        let totalVolume = new Big(0);
        for (let uTrade of uTrades) {
            const volume = this.uTradeTakesOpenMakers(uTrade);
            totalVolume = totalVolume.plus(volume);
        }
        return totalVolume;
    }
}

export {
    Taken as default,
    Taken,
    OrderingEvents as TakenEvents,
}
