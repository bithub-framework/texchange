import {
    Side,
    OpenOrder,
    Trade,
    OpenMaker,
    Operation,
} from '../interfaces';
import { min } from '../big-math';
import { Big, RoundingMode } from 'big.js';
import { type Hub } from '../hub';


export class Taken {
    constructor(private hub: Hub) { }

    public tradeTakesOpenMakers(trade: Trade): void {
        trade = {
            price: trade.price,
            quantity: trade.quantity,
            side: trade.side,
            time: trade.time,
            id: trade.id,
        };
        for (const order of [...this.hub.models.makers.values()])
            if (this.tradeShouldTakeOpenOrder(trade, order)) {
                this.tradeTakesOrderQueue(trade, order);
                this.tradeTakesOpenMaker(trade, order);
            }
    }

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

    /**
     * @param trade variable
     * @param maker variable
     */
    private tradeTakesOrderQueue(trade: Trade, maker: OpenMaker): void {
        if (trade.price.eq(maker.price)) {
            const volume = min(trade.quantity, maker.behind);
            trade.quantity = trade.quantity.minus(volume);
            maker.behind = maker.behind.minus(volume);
        } else maker.behind = new Big(0);
    }

    /**
     * @param trade variable
     * @param maker variable
     */
    private tradeTakesOpenMaker(trade: Trade, maker: OpenMaker): void {
        const { assets, margin, makers } = this.hub.models;

        const volume = min(trade.quantity, maker.unfilled);
        const dollarVolume = this.hub.context.calculation
            .dollarVolume(maker.price, volume)
            .round(this.hub.context.config.CURRENCY_DP);
        trade.quantity = trade.quantity.minus(volume);
        makers.takeOrder(maker.id, volume);

        assets.payFee(
            dollarVolume
                .times(this.hub.context.config.MAKER_FEE_RATE)
                .round(this.hub.context.config.CURRENCY_DP, RoundingMode.RoundUp)
        );
        // margin before position
        if (maker.operation === Operation.OPEN) {
            margin.incMargin(maker.length, volume, dollarVolume);
            assets.openPosition(maker.length, volume, dollarVolume);
        } else {
            margin.decMargin(maker.length, volume, dollarVolume);
            assets.closePosition(maker.length, volume, dollarVolume);
        }
    }

}
