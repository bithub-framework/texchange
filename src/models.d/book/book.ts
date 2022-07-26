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



export class Book<H extends HLike<H>> implements StatefulLike<Book.Snapshot> {
    private Decrements = new DecrementsStatic<H>(this.context.Data.H);

    private time = Number.NEGATIVE_INFINITY;
    private basebook = new Orderbook<H>(
        [], [],
        Number.NEGATIVE_INFINITY,
    );
    private decrements = new Decrements<H>(
        new Map<string, H>(),
        new Map<string, H>(),
    );
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
        const oldTotalDecrement = this.decrements.get(side).get(priceString)
            || this.context.Data.H.from(0);
        const newTotalDecrement = oldTotalDecrement.plus(decrement);
        this.decrements.get(side).set(priceString, newTotalDecrement);
        this.time = this.context.timeline.now();
        this.finalbookCache = null;
    }

    private tryApply(): Orderbook<H> {
        if (this.finalbookCache) return this.finalbookCache;

        const $final = new Orderbook<H>([], [], this.time);
        const $total = new Decrements<H>(
            new Map<string, H>(),
            new Map<string, H>(),
        );
        for (const side of [Side.BID, Side.ASK]) {
            for (const order of this.basebook.get(side))
                $total.get(side).set(
                    order.price.toFixed(this.marketSpec.PRICE_DP),
                    order.quantity,
                );
            for (const [priceString, decrement] of this.decrements.get(side)) {
                let quantity = $total.get(side).get(priceString);
                if (typeof quantity !== 'undefined') {
                    quantity = quantity.minus(decrement);
                    if (quantity.lte(0)) $total.get(side).delete(priceString);
                    else $total.get(side).set(priceString, quantity);
                } else this.decrements.get(side).delete(priceString);
            }
            // 文档说 Map 的迭代顺序等于插入顺序，所以不用排序
            $final.set(
                side,
                [...$total.get(side)].map(([priceString, quantity]) => ({
                    price: this.context.Data.H.from(priceString),
                    quantity,
                    side,
                })),
            );
        }
        return this.finalbookCache = $final;
    }

    public getOrderbook(): Orderbook<H> {
        return this.tryApply();
    }

    public lineUp(order: OpenOrder<H>): H {
        const makers = this.getOrderbook().get(order.side);
        let behind = this.context.Data.H.from(0);
        for (const maker of makers)
            if (maker.price.eq(order.price))
                behind = behind.plus(maker.quantity);
        return behind;
    }

    public capture(): Book.Snapshot {
        return {
            basebook: this.context.Data.Orderbook.captureOrderbook(this.basebook),
            decrements: this.Decrements.capture(this.decrements),
            time: Number.isFinite(this.time)
                ? this.time
                : null,
        }
    }

    public restore(snapshot: Book.Snapshot): void {
        this.basebook = this.context.Data.Orderbook.restoreOrderbook(snapshot.basebook);
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
