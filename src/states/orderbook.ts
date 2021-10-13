import {
    Orderbook,
    Side,
    TypeRecur,
    StateLike,
    BookOrder,
} from '../interfaces';
import Big from 'big.js';
import assert = require('assert');
import { Core } from '../core';


export interface Snapshot {
    baseBook: Orderbook;
    decrements: {
        [side: number]: [string, Big][],
    };
    time: number;
}

export class StateOrderbook implements StateLike<Snapshot>{
    private time = Number.NEGATIVE_INFINITY;
    private orderbook: Orderbook = {
        [Side.ASK]: [],
        [Side.BID]: [],
        time: Number.NEGATIVE_INFINITY,
    };
    private applied = true;
    private baseBook: Orderbook = {
        [Side.ASK]: [],
        [Side.BID]: [],
        time: Number.NEGATIVE_INFINITY,
    };
    // decrement 必须是正数
    private decrements = {
        [Side.ASK]: new Map<string, Big>(),
        [Side.BID]: new Map<string, Big>(),
    };

    constructor(
        private core: Core,
        snapshot?: TypeRecur<Snapshot, Big, string>,
    ) {
        if (snapshot) {
            this.baseBook = {
                [Side.ASK]: snapshot.baseBook[Side.ASK].map<BookOrder>(order => ({
                    price: new Big(order.price),
                    quantity: new Big(order.quantity),
                    side: order.side,
                })),
                [Side.BID]: snapshot.baseBook[Side.BID].map<BookOrder>(order => ({
                    price: new Big(order.price),
                    quantity: new Big(order.quantity),
                    side: order.side,
                })),
                time: snapshot.baseBook.time,
            }
            this.decrements = {
                [Side.ASK]: new Map<string, Big>(
                    snapshot.decrements[Side.ASK].map(
                        ([priceString, decrement]) =>
                            [priceString, new Big(decrement)]
                    )),
                [Side.BID]: new Map<string, Big>(
                    snapshot.decrements[Side.BID].map(
                        ([priceString, decrement]) =>
                            [priceString, new Big(decrement)]
                    )),
            };
            this.time = snapshot.time;
            this.applied = false;
            this.apply();
        }
    }

    public getBook(): Orderbook {
        this.apply();
        return this.orderbook;
    }

    public setBase(newBaseBook: Orderbook) {
        this.baseBook = newBaseBook;
        this.time = this.core.timeline.now();
        this.applied = false;
    }

    public decQuantity(side: Side, price: Big, decrement: Big) {
        assert(decrement.gt(0));
        const priceString = price.toFixed(this.core.config.PRICE_DP);
        const origin = this.decrements[side].get(priceString) || new Big(0);
        this.decrements[side].set(priceString, origin.plus(decrement));
        this.time = this.core.timeline.now();
        this.applied = false;
    }

    private apply(): void {
        if (this.applied) return;
        for (const side of [Side.BID, Side.ASK]) {
            const total = {
                [Side.ASK]: new Map<string, Big>(),
                [Side.BID]: new Map<string, Big>(),
            };
            for (const order of this.baseBook[side])
                total[side].set(
                    order.price.toFixed(this.core.config.PRICE_DP),
                    order.quantity,
                );
            for (const [priceString, decrement] of this.decrements[side]) {
                const quantity = total[side].get(priceString);
                if (quantity) {
                    const newQuantity = quantity.minus(decrement);
                    if (newQuantity.lte(0)) total[side].delete(priceString);
                    else total[side].set(priceString, newQuantity);
                } else this.decrements[side].delete(priceString);
            }
            // 文档说 Map 的迭代顺序等于插入顺序，所以不用排序
            this.orderbook[side] = [...total[side]]
                .map(([priceString, quantity]) => ({
                    price: new Big(priceString), quantity, side,
                }));
        }
        this.applied = true;
    }

    public capture(): Snapshot {
        return {
            baseBook: this.baseBook,
            decrements: {
                [Side.ASK]: [...this.decrements[Side.ASK]],
                [Side.BID]: [...this.decrements[Side.BID]],
            },
            time: this.time,
        }
    }
}
