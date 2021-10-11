import {
    OpenOrder,
    Side, Operation,
    Trade,
} from '../interfaces';
import { min } from '../big-math';
import { Big, RoundingMode } from 'big.js';
import { Core } from '../core';


export class MethodsTaking {
    constructor(
        private core: Core,
    ) { }

    public orderTakes(taker: OpenOrder): Trade[] {
        const trades: Trade[] = [];
        let volume = new Big(0);
        let dollarVolume = new Big(0);
        const orderbook = this.core.states.orderbook.getBook();
        for (const maker of orderbook[-taker.side])
            if (
                (
                    taker.side === Side.BID && taker.price.gte(maker.price) ||
                    taker.side === Side.ASK && taker.price.lte(maker.price)
                ) && taker.unfilled.gt(0)
            ) {
                const quantity = min(taker.unfilled, maker.quantity);
                trades.push({
                    side: taker.side,
                    price: maker.price,
                    quantity,
                    time: this.core.timeline.now(),
                    id: ++this.core.states.misc.userTradeCount,
                });
                this.core.states.orderbook.decQuantity(maker.side, maker.price, quantity);
                taker.filled = taker.filled.plus(quantity);
                taker.unfilled = taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(this.core.calculation.dollarVolume(maker.price, quantity))
                    .round(this.core.config.CURRENCY_DP);
            }
        this.core.states.orderbook.apply();

        const takerFee = dollarVolume.times(this.core.config.TAKER_FEE_RATE)
            .round(this.core.config.CURRENCY_DP, RoundingMode.RoundUp);
        if (taker.operation === Operation.OPEN) {
            this.core.states.margin.incPositionMargin(
                taker.length,
                this.core.calculation.positionMarginIncrement(
                    taker, volume, dollarVolume,
                ).round(this.core.config.CURRENCY_DP),
            );
            this.core.states.assets.openPosition(
                taker.length, volume, dollarVolume, takerFee,
            );
        } else {
            this.core.states.margin.decPositionMargin(
                taker.length,
                this.core.calculation.positionMarginDecrement(
                    taker, volume, dollarVolume,
                ).round(this.core.config.CURRENCY_DP),
            );
            this.core.states.assets.closePosition(
                taker.length, volume, dollarVolume, takerFee,
            );
        }

        return trades;
    }
}
