import { Ordering } from './2-ordering';
import {
    BID, ASK,
    UnidentifiedTrade,
    min,
    OpenOrder,
    clone,
} from './interfaces';

class Taken extends Ordering {
    protected uTradeShouldTakeOpenOrder(
        trade: UnidentifiedTrade, maker: OpenOrder,
    ): boolean {
        return (
            maker.side === BID &&
            trade.side === ASK &&
            trade.price.lt(maker.price)
            ||
            maker.side === ASK &&
            trade.side === BID &&
            trade.price.gt(maker.price)
        );
    }

    protected uTradeTakesOpenOrder(
        uTrade: UnidentifiedTrade, maker: OpenOrder,
    ) {
        const volume = min(uTrade.quantity, maker.quantity);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        uTrade.quantity = uTrade.quantity.minus(volume);
        const toThaw = this.openOrders.takeOrder(maker.id, volume, dollarVolume);
        return [volume, dollarVolume, toThaw] as const;
    }

    protected uTradeTakesOpenOrders(uTrade: UnidentifiedTrade) {
        uTrade = { ...uTrade };
        let totalVolume = new Big(0);
        for (const order of this.openOrders.values())
            if (this.uTradeShouldTakeOpenOrder(uTrade, order)) {
                const [volume] = this.uTradeTakesOpenOrder(uTrade, order);
                totalVolume = totalVolume.plus(volume);
            }
        return totalVolume;
    }

    public updateTrades(uTrades: UnidentifiedTrade[]) {
        super.updateTrades(uTrades);
        let totalVolume = new Big(0);
        for (let uTrade of uTrades) {
            const volume = this.uTradeTakesOpenOrders(uTrade);
            totalVolume = totalVolume.plus(volume);
        }
        return totalVolume;
    }
}

export {
    Taken as default,
    Taken,
}
