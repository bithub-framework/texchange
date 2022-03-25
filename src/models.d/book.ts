import {
    Orderbook,
    Side,
    HLike, H, HStatic,
    OrderbookStatic,
} from 'interfaces';
import assert = require('assert');
import { Context } from '../context/context';
import { StatefulLike } from 'startable';



export class Book<H extends HLike<H>>
    implements StatefulLike<Book.Snapshot> {

    private time = Number.NEGATIVE_INFINITY;
    private basebook: Orderbook<H> = {
        [Side.ASK]: [],
        [Side.BID]: [],
        time: Number.NEGATIVE_INFINITY,
    };
    // decrement 必须是正数
    private decrements: Decrements<H> = {
        [Side.ASK]: new Map<string, H>(),
        [Side.BID]: new Map<string, H>(),
    };
    private finalbookCache: Orderbook<H> | null = null;

    private Orderbook = new OrderbookStatic<H>(this.context.H);
    private Decrements = new DecrementsStatic<H>(this.context.H);

    public constructor(
        private context: Context<H>,
    ) { }

    public setBasebook(basebook: Orderbook<H>): void {
        assert(basebook.time === this.context.timeline.now());
        this.basebook = basebook;
        this.time = basebook.time;
        this.tryApply();
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
                    order.price.toFixed(this.context.config.market.PRICE_DP),
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
                    price: this.context.H.from(priceString),
                    quantity,
                    side,
                }));
        }
        return this.finalbookCache = $final;
    }

    public getBook(): Orderbook<H> {
        return this.tryApply();
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

class DecrementsStatic<H extends HLike<H>> {
    public constructor(
        private H: HStatic<H>,
    ) { }

    public capture(decrements: Decrements<H>): Decrements.Snapshot {
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

    public restore(snapshot: Decrements.Snapshot): Decrements<H> {
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
