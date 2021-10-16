import {
    Side,
    OpenOrder,
    Trade,
    OpenMaker,
    Operation,
} from '../interfaces';
import { min } from '../big-math';
import { Big, RoundingMode } from 'big.js';
import { Core } from '../core';


export class MethodsTaken {
    constructor(
        private core: Core,
    ) { }

    private tradeShouldTakeOpenOrder(
        trade: Trade, maker: OpenOrder,
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

    private tradeTakesOrderQueue(
        trade: Trade, maker: OpenMaker,
    ): void {
        if (trade.price.eq(maker.price)) {
            const volume = min(trade.quantity, maker.behind);
            trade.quantity = trade.quantity.minus(volume);
            maker.behind = maker.behind.minus(volume);
        } else maker.behind = new Big(0);
    }

    private tradeTakesOpenMaker(
        trade: Trade, maker: OpenMaker,
    ): Big {
        const { assets, margin, makers } = this.core.states;

        const volume = min(trade.quantity, maker.unfilled);
        const dollarVolume = this.core.calculation.dollarVolume(maker.price, volume)
            .round(this.core.config.CURRENCY_DP);
        trade.quantity = trade.quantity.minus(volume);
        const toThaw = makers.takeOrder(maker.id, volume, dollarVolume);
        margin.thaw(toThaw);

        const makerFee = dollarVolume.times(this.core.config.MAKER_FEE_RATE)
            .round(this.core.config.CURRENCY_DP, RoundingMode.RoundUp);
        if (maker.operation === Operation.OPEN) {
            margin.incMargin(maker.length, volume, dollarVolume);
            assets.openPosition(maker.length, volume, dollarVolume, makerFee);
        } else {
            margin.decMargin(maker.length, volume, dollarVolume);
            assets.closePosition(maker.length, volume, dollarVolume, makerFee);
        }

        return volume;
    }

    public tradeTakesOpenMakers(trade: Trade): Big {
        trade = {
            price: trade.price,
            quantity: trade.quantity,
            side: trade.side,
            time: trade.time,
            id: trade.id,
        };
        let totalVolume = new Big(0);
        for (const order of [...this.core.states.makers.values()])
            if (this.tradeShouldTakeOpenOrder(trade, order)) {
                this.tradeTakesOrderQueue(trade, order);
                const volume = this.tradeTakesOpenMaker(trade, order);
                totalVolume = totalVolume.plus(volume);
            }
        return totalVolume;
    }
}
