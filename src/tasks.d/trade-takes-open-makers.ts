import {
    Side,
    TexchangeOpenOrder,
    TexchangeTrade,
    TexchangeOpenMaker,
    Operation,
    HLike, H,
} from 'interfaces';
import { min } from '../utilities';
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, TradeTakesOpenMakersLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';



export class TradeTakesOpenMakers<H extends HLike<H>>
    extends Task<H>
    implements TradeTakesOpenMakersLike<H> {
    constructor(
        protected readonly context: Context<H>,
        protected readonly models: StatefulModels<H>,
        protected readonly broadcast: Broadcast<H>,
        protected readonly tasks: TasksLike<H>,
    ) { super(); }

    public tradeTakesOpenMakers(roTrade: TexchangeTrade<H>): void {
        const trade: TexchangeTrade.MutablePlain<H> = {
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
        trade: TexchangeTrade<H>, maker: TexchangeOpenOrder<H>,
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
        trade: TexchangeTrade.MutablePlain<H>,
        maker: TexchangeOpenMaker<H>,
    ): void {
        const { makers } = this.models;
        if (trade.price.eq(maker.price)) {
            const volume = min(trade.quantity, maker.behind);
            trade.quantity = trade.quantity.minus(volume);
            makers.takeOrderQueue(maker.id, volume);
        } else makers.takeOrderQueue(maker.id);
    }

    private tradeTakesOpenMaker(
        trade: TexchangeTrade.MutablePlain<H>,
        maker: TexchangeOpenMaker<H>,
    ): void {
        const { assets, margins: margin, makers } = this.models;

        const volume = min(trade.quantity, maker.unfilled);
        const dollarVolume = this.context.config.market
            .dollarVolume(maker.price, volume)
            .round(this.context.config.market.CURRENCY_DP);
        trade.quantity = trade.quantity.minus(volume);
        makers.takeOrder(maker.id, volume);

        assets.payFee(
            dollarVolume
                .times(this.context.config.account.MAKER_FEE_RATE)
                .round(this.context.config.market.CURRENCY_DP, H.RoundingMode.HALF_AWAY_FROM_ZERO)
        );
        if (maker.operation === Operation.OPEN)
            this.tasks.orderVolumes.open({
                length: maker.length,
                volume,
                dollarVolume,
            });
        else
            this.tasks.orderVolumes.close({
                length: maker.length,
                volume,
                dollarVolume,
            });
    }
}
