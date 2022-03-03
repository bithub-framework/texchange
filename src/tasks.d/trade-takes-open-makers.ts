import {
    Side,
    OpenOrder,
    Trade,
    OpenMaker,
    Operation,
} from 'interfaces';
import { min } from '../utilities';
import { RoundingMode } from 'big.js';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { Tasks, TradeTakesOpenMakersLike } from '../tasks';
import { Broadcast } from '../broadcast';



export class TradeTakesOpenMakers extends Task
    implements TradeTakesOpenMakersLike {
    constructor(
        protected context: Context,
        protected models: Models,
        protected broadcast: Broadcast,
        protected tasks: Tasks,
    ) {
        super();
    }

    public tradeTakesOpenMakers(roTrade: Readonly<Trade>): void {
        const trade: Trade = {
            price: roTrade.price,
            quantity: roTrade.quantity,
            side: roTrade.side,
            time: roTrade.time,
            id: roTrade.id,
        };
        for (const order of [...this.models.makers])
            if (this.tradeShouldTakeOpenOrder(trade, order)) {
                this.tradeTakesOrderQueue(trade, order);
                this.tradeTakesOpenMaker(trade, order);
            }
    }

    private tradeShouldTakeOpenOrder(
        trade: Readonly<Trade>, maker: Readonly<OpenOrder>,
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

    private tradeTakesOrderQueue(trade: Trade, maker: OpenMaker): void {
        const { makers } = this.models;
        if (trade.price.eq(maker.price)) {
            const volume = min(trade.quantity, maker.behind);
            trade.quantity = trade.quantity.minus(volume);
            makers.takeOrderQueue(maker.id, volume);
        } else makers.takeOrderQueue(maker.id);
    }

    private tradeTakesOpenMaker(trade: Trade, maker: Readonly<OpenMaker>): void {
        const { assets, margin, makers } = this.models;

        const volume = min(trade.quantity, maker.unfilled);
        const dollarVolume = this.context.config
            .dollarVolume(maker.price, volume)
            .round(this.context.config.CURRENCY_DP);
        trade.quantity = trade.quantity.minus(volume);
        makers.takeOrder(maker.id, volume);

        assets.payFee(
            dollarVolume
                .times(this.context.config.MAKER_FEE_RATE)
                .round(this.context.config.CURRENCY_DP, RoundingMode.RoundUp)
        );
        if (maker.operation === Operation.OPEN) {
            margin.incMargin(maker.length, volume, dollarVolume);
            assets.openPosition(maker.length, volume, dollarVolume);
        } else {
            margin.decMargin(assets, maker.length, volume, dollarVolume);
            assets.closePosition(maker.length, volume, dollarVolume);
        }
    }
}
