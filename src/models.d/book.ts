import {
    Orderbook,
    Side,
    BookOrder,
    ReadonlyRecur,
    JsonCompatible,
} from 'interfaces';
import { Model } from '../model';
import Big from 'big.js';
import assert = require('assert');
import { Context } from '../context';



export class Book extends Model<Snapshot> {
    private time = Number.NEGATIVE_INFINITY;
    private basebook: Readonly<Orderbook> = {
        [Side.ASK]: [],
        [Side.BID]: [],
        time: Number.NEGATIVE_INFINITY,
    };
    // decrement 必须是正数
    private decrements = {
        [Side.ASK]: new Map<string, Big>(),
        [Side.BID]: new Map<string, Big>(),
    };
    private finalbook: Orderbook | null = null;

    constructor(
        protected readonly context: Context,
    ) { super(); }

    public setBasebook(newBasebook: Readonly<Orderbook>) {
        assert(newBasebook.time === this.context.timeline.now());
        this.basebook = newBasebook;
        this.time = newBasebook.time;
        this.finalbook = null;
    }

    public decQuantity(side: Side, price: Big, decrement: Big): void {
        assert(decrement.gt(0));
        const priceString = price.toFixed(this.context.config.market.PRICE_DP);
        const old = this.decrements[side].get(priceString) || new Big(0);
        this.decrements[side].set(priceString, old.plus(decrement));
        this.time = this.context.timeline.now();
        this.finalbook = null;
    }

    private apply(): Readonly<Orderbook> {
        if (this.finalbook) return this.finalbook;
        const total = {
            [Side.ASK]: new Map<string, Big>(),
            [Side.BID]: new Map<string, Big>(),
        };
        this.finalbook = { time: this.time };
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
            this.finalbook[side] = [...total[side]]
                .map(([priceString, quantity]) => ({
                    price: new Big(priceString),
                    quantity,
                    side,
                }));
        }
        return this.finalbook;
    }

    public getBook(): Readonly<Orderbook> {
        return this.apply();
    }

    public capture(): Snapshot {
        return {
            basebook: {
                [Side.ASK]: this.basebook[Side.ASK].map(order => ({
                    price: order.price.toString(),
                    quantity: order.quantity.toString(),
                    side: order.side,
                })),
                [Side.BID]: this.basebook[Side.BID].map(order => ({
                    price: order.price.toString(),
                    quantity: order.quantity.toString(),
                    side: order.side,
                })),
                time: this.basebook.time,
            },
            decrements: {
                [Side.ASK]: [...this.decrements[Side.ASK]].map(
                    ([priceString, decrement]) =>
                        [priceString, decrement.toString()],
                ),
                [Side.BID]: [...this.decrements[Side.BID]].map(
                    ([priceString, decrement]) =>
                        [priceString, decrement.toString()],
                ),
            },
            time: this.time,
        }
    }

    public restore(snapshot: Snapshot): void {
        const basebook: Orderbook = {
            time: snapshot.basebook.time === null
                ? Number.NEGATIVE_INFINITY
                : snapshot.basebook.time
        };
        this.decrements = {};
        for (const side of [Side.ASK, Side.BID]) {
            basebook[side] = snapshot.basebook[side].map<BookOrder>(order => ({
                price: new Big(order.price),
                quantity: new Big(order.quantity),
                side: order.side!,
            }));
            this.decrements[side] = new Map<string, Big>(
                snapshot.decrements[side].map(
                    ([priceString, decrement]) =>
                        [priceString, new Big(decrement)]
                ));
        }
        this.basebook = basebook;
        this.time = snapshot.time === null
            ? Number.NEGATIVE_INFINITY
            : snapshot.time;
        this.finalbook = null;
    }
}

interface SnapshotStruct {
    basebook: Orderbook;
    decrements: {
        [side: number]: [string, Big][],
    };
    time: number;
}

export namespace Book {
    export type Snapshot = ReadonlyRecur<JsonCompatible<SnapshotStruct>>;
}
import Snapshot = Book.Snapshot;