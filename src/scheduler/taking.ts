import {
    OpenOrder,
    Side, Operation,
    Trade,
} from '../interfaces';
import { min } from '../big-math';
import { Big, RoundingMode } from 'big.js';
import { Context } from '../context/context';
import { Models } from '../models/models';



export class Taking {
    constructor(
        private context: Context,
        private models: Models,
    ) { }

    /**
     * @param taker variable
     */
    public orderTakes(taker: OpenOrder): Trade[] {
        const { margin, assets, progress, book } = this.models;
        const { config, timeline } = this.context;
        const orderbook = book.getBook();

        const trades: Trade[] = [];
        let volume = new Big(0);
        let dollarVolume = new Big(0);
        for (const maker of orderbook[-taker.side])
            if (
                (
                    taker.side === Side.BID && taker.price.gte(maker.price) ||
                    taker.side === Side.ASK && taker.price.lte(maker.price)
                ) && taker.unfilled.gt(0)
            ) {
                const quantity = min(taker.unfilled, maker.quantity);
                book.decQuantity(maker.side, maker.price, quantity);
                taker.filled = taker.filled.plus(quantity);
                taker.unfilled = taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(config.dollarVolume(maker.price, quantity))
                    .round(config.CURRENCY_DP);
                trades.push({
                    side: taker.side,
                    price: maker.price,
                    quantity,
                    time: timeline.now(),
                    id: ++progress.userTradeCount,
                });
            }

        assets.payFee(
            dollarVolume
                .times(config.TAKER_FEE_RATE)
                .round(config.CURRENCY_DP, RoundingMode.RoundUp)
        );
        if (taker.operation === Operation.OPEN) {
            margin.incMargin(taker.length, volume, dollarVolume);
            assets.openPosition(taker.length, volume, dollarVolume);
        } else {
            margin.decMargin(assets, taker.length, volume, dollarVolume);
            assets.closePosition(taker.length, volume, dollarVolume);
        }

        return trades;
    }
}
