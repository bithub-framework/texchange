import { Ordering, OrderingEvents } from './2-ordering';
import {
    Side,
    UnidentifiedTrade,
    min,
    OpenOrder,
    OpenMaker,
    Orderbook,
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
        if (uTrade.price.eq(maker.price)) {
            const volume = min(uTrade.quantity, maker.behind);
            uTrade.quantity = uTrade.quantity.minus(volume);
            maker.behind = maker.behind.minus(volume);
        } else maker.behind = new Big(0);
    }

    protected uTradeTakesOpenMaker(
        uTrade: UnidentifiedTrade, maker: OpenMaker,
    ): {
        volume: Big,
        dollarVolume: Big,
        toThaw: Frozen,
    } {
        const volume = min(uTrade.quantity, maker.unfilled);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        uTrade.quantity = uTrade.quantity.minus(volume);
        const toThaw = this.openMakers.takeOrder(maker.id, volume, dollarVolume);
        return { volume, dollarVolume, toThaw };
    }

    protected uTradeTakesOpenMakers(uTrade: UnidentifiedTrade) {
        uTrade = {
            price: uTrade.price,
            quantity: uTrade.quantity,
            side: uTrade.side,
            time: uTrade.time,
        };
        let totalVolume = new Big(0);
        for (const order of this.openMakers.values())
            if (this.uTradeShouldTakeOpenOrder(uTrade, order)) {
                this.uTradeTakesOrderQueue(uTrade, order);
                const { volume } = this.uTradeTakesOpenMaker(uTrade, order);
                totalVolume = totalVolume.plus(volume);
            }
        return totalVolume;
    }

    /** @override */
    public updateTrades(uTrades: UnidentifiedTrade[]): void {
        this.pushUTrades(uTrades).catch(err => void this.emit('error', err));
        let totalVolume = new Big(0);
        for (let uTrade of uTrades) {
            const volume = this.uTradeTakesOpenMakers(uTrade);
            totalVolume = totalVolume.plus(volume);
        }
    }

    /** @override */
    public updateOrderbook(orderbook: Orderbook): void {
        this.bookManager.setBase(orderbook);
        this.bookManager.apply();
        const makers = [...this.openMakers.values()];
        for (const maker of makers) {
            this.openMakers.removeOrder(maker.id);
            this.makeOpenOrder(maker);
        }
        this.pushOrderbook().catch(err => void this.emit('error', err));
    }
}

export {
    Taken as default,
    Taken,
    OrderingEvents as TakenEvents,
}
