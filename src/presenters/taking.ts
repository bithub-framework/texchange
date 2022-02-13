import {
    OpenOrder,
    Side, Operation,
    Trade,
} from '../interfaces';
import { min } from '../big-math';
import { Big, RoundingMode } from 'big.js';
import { type Hub } from '../hub';


interface Deps extends Pick<Hub, 'context' | 'models'> { }

export class Taking {
    constructor(private hub: Deps) { }

    /**
     * @param taker variable
     */
    public orderTakes(taker: OpenOrder): Trade[] {
        const { margin, assets, progress, book } = this.hub.models;
        const { config, calculation, timeline } = this.hub.context;
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
                    .plus(calculation.dollarVolume(maker.price, quantity))
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
        // margin before position
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
