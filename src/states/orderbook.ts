import {
    Orderbook,
    Side,
    StatefulLike,
    BookOrder,
    Parsed,
} from '../interfaces';
import Big from 'big.js';
import assert = require('assert');
import { Hub } from '../hub';


export interface Snapshot {
    basebook: Orderbook;
    decrements: {
        [side: number]: [string, Big][],
    };
    time: number;
}

export class StateOrderbook implements StatefulLike<Snapshot>, Orderbook {
    [side: number]: BookOrder[];
    public time = Number.NEGATIVE_INFINITY;
    public get [Side.ASK]() {
        this.apply();
        return Reflect.get(this, Side.ASK);
    }
    public get [Side.BID]() {
        this.apply();
        return Reflect.get(this, Side.BID);
    }

    private applied = true;
    private basebook: Orderbook = {
        [Side.ASK]: [],
        [Side.BID]: [],
        time: Number.NEGATIVE_INFINITY,
    };
    // decrement 必须是正数
    private decrements = {
        [Side.ASK]: new Map<string, Big>(),
        [Side.BID]: new Map<string, Big>(),
    };

    constructor(private core: Hub) { }

    public setBasebook(newBasebook: Orderbook) {
        assert(newBasebook.time === this.core.timeline.now());
        this.basebook = newBasebook;
        this.time = newBasebook.time;
        this.applied = false;
    }

    public decQuantity(side: Side, price: Big, decrement: Big): void {
        assert(decrement.gt(0));
        const priceString = price.toFixed(this.core.config.PRICE_DP);
        const old = this.decrements[side].get(priceString) || new Big(0);
        this.decrements[side].set(priceString, old.plus(decrement));
        this.time = this.core.timeline.now();
        this.applied = false;
    }

    private apply(): void {
        if (this.applied) return;
        const total = {
            [Side.ASK]: new Map<string, Big>(),
            [Side.BID]: new Map<string, Big>(),
        };
        for (const side of [Side.BID, Side.ASK]) {
            for (const order of this.basebook[side])
                total[side].set(
                    order.price.toFixed(this.core.config.PRICE_DP),
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
            this[side] = [...total[side]]
                .map(([priceString, quantity]) => ({
                    price: new Big(priceString),
                    quantity,
                    side,
                }));
        }
        this.applied = true;
    }

    public capture(): Snapshot {
        return {
            basebook: {
                [Side.ASK]: this.basebook[Side.ASK].map(order => ({
                    price: order.price,
                    quantity: order.quantity,
                    side: order.side,
                })),
                [Side.BID]: this.basebook[Side.BID].map(order => ({
                    price: order.price,
                    quantity: order.quantity,
                    side: order.side,
                })),
                time: this.basebook.time,
            },
            decrements: {
                [Side.ASK]: [...this.decrements[Side.ASK]],
                [Side.BID]: [...this.decrements[Side.BID]],
            },
            time: this.time,
        }
    }

    public restore(snapshot: Parsed<Snapshot>): void {
        this.basebook = {
            time: snapshot.basebook.time === null
                ? Number.NEGATIVE_INFINITY
                : snapshot.basebook.time
        };
        this.decrements = {};
        for (const side of [Side.ASK, Side.BID]) {
            this.basebook[side] = snapshot.basebook[side].map<BookOrder>(order => ({
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
        this.time = snapshot.time === null
            ? Number.NEGATIVE_INFINITY
            : snapshot.time;
        this.applied = false;
    }
}
