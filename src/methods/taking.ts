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
        const { margin, assets, misc, orderbook } = this.core.states;
        const { config, calculation } = this.core;

        const trades: Trade[] = [];
        let volume = new Big(0);
        let dollarVolume = new Big(0);
        for (const maker of orderbook.getOrderbook()[-taker.side])
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
                    id: ++misc.userTradeCount,
                });
                orderbook.decQuantity(maker.side, maker.price, quantity);
                taker.filled = taker.filled.plus(quantity);
                taker.unfilled = taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(calculation.dollarVolume(maker.price, quantity))
                    .round(config.CURRENCY_DP);
            }
        // this.core.states.orderbook.apply();

        assets.payFee(
            dollarVolume
                .times(config.TAKER_FEE_RATE)
                .round(config.CURRENCY_DP, RoundingMode.RoundUp)
        );
        if (taker.operation === Operation.OPEN) {
            margin.incMargin(taker.length, volume, dollarVolume);
            assets.openPosition(taker.length, volume, dollarVolume);
        } else {
            margin.decMargin(taker.length, volume, dollarVolume);
            assets.closePosition(taker.length, volume, dollarVolume);
        }

        return trades;
    }
}
