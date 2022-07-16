import {
    Orderbook,
    Side,
    HLike,
    MarketSpec,
    OpenOrder,
} from 'secretary-like';
import assert = require('assert');
import { Context } from '../../context';
import { StatefulLike } from '../../stateful-like';
import { Decrements, DecrementsStatic } from './decrements';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';



export class Book<H extends HLike<H>>
    implements StatefulLike<Book.Snapshot> {
    private Decrements = new DecrementsStatic<H>(this.context.Data.H);

    private time = Number.NEGATIVE_INFINITY;
    private basebook: Orderbook<H> = {
        [Side.ASK]: [],
        [Side.BID]: [],
        time: Number.NEGATIVE_INFINITY,
    };
    private decrements: Decrements<H> = {
        [Side.ASK]: new Map<string, H>(),
        [Side.BID]: new Map<string, H>(),
    };
    private finalbookCache: Orderbook<H> | null = null;

    public constructor(
        @inject(TYPES.context)
        private context: Context<H>,
        @inject(TYPES.marketSpec)
        private marketSpec: MarketSpec<H>,
    ) { }

    public setBasebook(basebook: Orderbook<H>): void {
        assert(basebook.time === this.context.timeline.now());
        this.basebook = basebook;
        this.time = basebook.time;
        this.finalbookCache = null;
    }

    public decQuantity(
        side: Side,
        price: H,
        decrement: H,
    ): void {
        assert(decrement.gt(0));
        const priceString = price.toFixed(this.marketSpec.PRICE_DP);
        const oldTotalDecrement = this.decrements[side].get(priceString)
            || new this.context.Data.H(0);
        const newTotalDecrement = oldTotalDecrement.plus(decrement);
        this.decrements[side].set(priceString, newTotalDecrement);
        this.time = this.context.timeline.now();
        this.finalbookCache = null;
    }

    private tryApply(): Orderbook<H> {
        if (this.finalbookCache) return this.finalbookCache;

        const $final: Orderbook<H> = { time: this.time };
        const total: Decrements<H> = {
            [Side.ASK]: new Map<string, H>(),
            [Side.BID]: new Map<string, H>(),
        };
        for (const side of [Side.BID, Side.ASK]) {
            for (const order of this.basebook[side])
                total[side].set(
                    order.price.toFixed(this.marketSpec.PRICE_DP),
                    order.quantity,
                );
            for (const [priceString, decrement] of this.decrements[side]) {
                let quantity = total[side].get(priceString);
                if (typeof quantity !== 'undefined') {
                    quantity = quantity.minus(decrement);
                    if (quantity.lte(0)) total[side].delete(priceString);
                    else total[side].set(priceString, quantity);
                } else this.decrements[side].delete(priceString);
            }
            // 文档说 Map 的迭代顺序等于插入顺序，所以不用排序
            $final[side] = [...total[side]]
                .map(([priceString, quantity]) => ({
                    price: new this.context.Data.H(priceString),
                    quantity,
                    side,
                }));
        }
        return this.finalbookCache = $final;
    }

    public getOrderbook(): Orderbook<H> {
        return this.tryApply();
    }

    public lineUp(order: OpenOrder<H>): H {
        const makers = this.getOrderbook()[order.side];
        let behind = new this.context.Data.H(0);
        for (const maker of makers)
            if (maker.price.eq(order.price))
                behind = behind.plus(maker.quantity);
        return behind;
    }

    public capture(): Book.Snapshot {
        return {
            basebook: this.context.Data.Orderbook.capture(this.basebook),
            decrements: this.Decrements.capture(this.decrements),
            time: Number.isFinite(this.time)
                ? this.time
                : null,
        }
    }

    public restore(snapshot: Book.Snapshot): void {
        this.basebook = this.context.Data.Orderbook.restore(snapshot.basebook);
        this.decrements = this.Decrements.restore(snapshot.decrements);
        this.time = snapshot.time === null
            ? Number.NEGATIVE_INFINITY
            : snapshot.time;
        this.finalbookCache = null;
    }
}

export namespace Book {
    export interface Snapshot {
        basebook: Orderbook.Snapshot;
        decrements: Decrements.Snapshot;
        time: Orderbook.Snapshot['time'];
    }
}
