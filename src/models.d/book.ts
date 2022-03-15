import {
    Orderbook,
    ConcreteOrderbook,
    Side,
    HLike, H, HStatic,
    ConcreteOrderbookStatic,
} from 'interfaces';
import { Model } from '../model';
import assert = require('assert');
import { Context } from '../context';



export class Book<H extends HLike<H>> extends Model<H, Book.Snapshot> {
    private time = Number.NEGATIVE_INFINITY;
    private basebook: ConcreteOrderbook<H> = {
        [Side.ASK]: [],
        [Side.BID]: [],
        time: Number.NEGATIVE_INFINITY,
    };
    // decrement 必须是正数
    private decrements: Decrements<H> = {
        [Side.ASK]: new Map<string, H>(),
        [Side.BID]: new Map<string, H>(),
    };
    private finalbookCache: ConcreteOrderbook.MutablePlain<H> | null = null;
    private Orderbook = new ConcreteOrderbookStatic<H>(this.context.H);
    private Decrements = new DecrementsStatic<H>(this.context.H);

    constructor(
        protected readonly context: Context<H>,
    ) {
        super();
    }

    public setBasebook(newBasebook: ConcreteOrderbook<H>) {
        assert(newBasebook.time === this.context.timeline.now());
        this.basebook = newBasebook;
        this.time = newBasebook.time;
        this.finalbookCache = null;
    }

    public decQuantity(side: Side, price: H, decrement: H): void {
        assert(decrement.gt(0));
        const priceString = price.toFixed(this.context.config.market.PRICE_DP);
        const oldTotalDecrement = this.decrements[side].get(priceString)
            || this.context.H.from(0);
        const newTotalDecrement = oldTotalDecrement.plus(decrement);
        this.decrements[side].set(priceString, newTotalDecrement);
        this.time = this.context.timeline.now();
        this.finalbookCache = null;
    }

    private apply(): ConcreteOrderbook<H> {
        if (this.finalbookCache) return this.finalbookCache;
        const total: Decrements<H> = {
            [Side.ASK]: new Map<string, H>(),
            [Side.BID]: new Map<string, H>(),
        };
        this.finalbookCache = { time: this.time };
        for (const side of [Side.BID, Side.ASK]) {
            for (const order of this.basebook[side])
                total[side].set(
                    order.price.toFixed(this.context.config.market.PRICE_DP),
                    order.quantity,
                );
            for (const [priceString, decrement] of this.decrements[side]) {
                let quantity = total[side].get(priceString);
                if (quantity) {
                    quantity = quantity.minus(decrement);
                    if (quantity.lte(0)) total[side].delete(priceString);
                    else total[side].set(priceString, quantity);
                } else this.decrements[side].delete(priceString);
            }
            // 文档说 Map 的迭代顺序等于插入顺序，所以不用排序
            this.finalbookCache[side] = [...total[side]]
                .map(([priceString, quantity]) => ({
                    price: this.context.H.from(priceString),
                    quantity,
                    side,
                }));
        }
        return this.finalbookCache;
    }

    public getBook(): ConcreteOrderbook<H> {
        return this.apply();
    }

    public capture(): Book.Snapshot {
        return {
            basebook: this.Orderbook.capture(this.basebook),
            decrements: this.Decrements.capture(this.decrements),
            time: Number.isFinite(this.time)
                ? this.time
                : null,
        }
    }

    public restore(snapshot: Book.Snapshot): void {
        this.basebook = this.Orderbook.restore(snapshot.basebook);
        this.decrements = this.Decrements.restore(snapshot.decrements);
        this.time = snapshot.time === null
            ? Number.NEGATIVE_INFINITY
            : snapshot.time;
        this.finalbookCache = null;
    }
}


interface Decrements<H extends HLike<H>> {
    [side: Side]: Map<string, H>;
}
namespace Decrements {
    export interface Snapshot {
        readonly [side: Side]: readonly (readonly [string, H.Snapshot])[],
    }
}

export class DecrementsStatic<H extends HLike<H>> {
    public constructor(
        private H: HStatic<H>,
    ) { }

    capture(decrements: Decrements<H>): Decrements.Snapshot {
        return {
            [Side.ASK]: [...decrements[Side.ASK]].map(
                ([priceString, decrement]) =>
                    [priceString, this.H.capture(decrement)],
            ),
            [Side.BID]: [...decrements[Side.BID]].map(
                ([priceString, decrement]) =>
                    [priceString, this.H.capture(decrement)],
            ),
        };
    }

    restore(snapshot: Decrements.Snapshot): Decrements<H> {
        const decrements: Decrements<H> = {};
        for (const side of [Side.ASK, Side.BID]) {
            decrements[side] = new Map<string, H>(
                snapshot[side].map(
                    ([priceString, decrement]) =>
                        [priceString, this.H.restore(decrement)]
                ));
        }
        return decrements;
    }
}

export namespace Book {
    export interface Snapshot {
        readonly basebook: Orderbook.Snapshot;
        readonly decrements: Decrements.Snapshot;
        readonly time: Orderbook.Snapshot['time'];
    }
}
