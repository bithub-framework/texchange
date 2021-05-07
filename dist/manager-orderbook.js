import { Side, } from './interfaces';
import Big from 'big.js';
import assert from 'assert';
class OrderbookManager {
    constructor(config, now) {
        this.config = config;
        this.now = now;
        this.orderbook = {
            [Side.ASK]: [],
            [Side.BID]: [],
            time: Number.NEGATIVE_INFINITY,
        };
        this.applied = false;
        this.baseBook = {
            [Side.ASK]: [],
            [Side.BID]: [],
            time: Number.NEGATIVE_INFINITY,
        };
        // decrement 必须是正数
        this.decrements = {
            [Side.ASK]: new Map(),
            [Side.BID]: new Map(),
        };
        this.apply();
    }
    getBook() {
        assert(this.applied);
        return this.orderbook;
    }
    setBase(newBaseBook) {
        this.baseBook = newBaseBook;
        this.orderbook.time = this.now();
        this.applied = false;
    }
    decQuantity(side, price, decrement) {
        assert(decrement.gt(0));
        const priceString = price.toFixed(this.config.PRICE_DP);
        const origin = this.decrements[side].get(priceString) || new Big(0);
        this.decrements[side].set(priceString, origin.plus(decrement));
        this.orderbook.time = this.now();
        this.applied = false;
    }
    apply() {
        for (const side of [Side.BID, Side.ASK]) {
            const total = {
                [Side.ASK]: new Map(),
                [Side.BID]: new Map(),
            };
            for (const order of this.baseBook[side])
                total[side].set(order.price.toFixed(this.config.PRICE_DP), order.quantity);
            for (const [priceString, decrement] of this.decrements[side]) {
                const quantity = total[side].get(priceString);
                if (quantity) {
                    const newQuantity = quantity.minus(decrement);
                    if (newQuantity.lte(0))
                        total[side].delete(priceString);
                    else
                        total[side].set(priceString, newQuantity);
                }
                else
                    this.decrements[side].delete(priceString);
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
export { OrderbookManager as default, OrderbookManager, };
//# sourceMappingURL=manager-orderbook.js.map