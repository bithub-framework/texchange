import {
    Orderbook,
    Side,
    Config,
} from '../interfaces';
import Big from 'big.js';
import assert = require('assert');

class OrderbookManager {
    private orderbook: Orderbook = {
        [Side.ASK]: [],
        [Side.BID]: [],
        time: Number.NEGATIVE_INFINITY,
    };
    private applied = false;
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
        private config: Config,
        private now: () => number,
    ) {
        this.apply();
    }

    public getBook(): Orderbook {
        assert(this.applied);
        return this.orderbook;
    }

    public setBase(newBaseBook: Orderbook) {
        this.baseBook = newBaseBook;
        this.orderbook.time = this.now();
        this.applied = false;
    }

    public decQuantity(side: Side, price: Big, decrement: Big) {
        assert(decrement.gt(0));
        const priceString = price.toFixed(this.config.PRICE_DP);
        const origin = this.decrements[side].get(priceString) || new Big(0);
        this.decrements[side].set(priceString, origin.plus(decrement));
        this.orderbook.time = this.now();
        this.applied = false;
    }

    public apply(): void {
        for (const side of [Side.BID, Side.ASK]) {
            const total = {
                [Side.ASK]: new Map<string, Big>(),
                [Side.BID]: new Map<string, Big>(),
            };
            for (const order of this.baseBook[side])
                total[side].set(
                    order.price.toFixed(this.config.PRICE_DP),
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
}

export {
    OrderbookManager as default,
    OrderbookManager,
}
