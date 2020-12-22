import { BID, ASK, } from './interfaces';
import { PRICE_DP, } from './config';
import Big from 'big.js';
class IncrementalBook {
    constructor() {
        this.baseBook = {
            [ASK]: [], [BID]: [], time: Number.NEGATIVE_INFINITY,
        };
        this.total = {
            [ASK]: new Map(),
            [BID]: new Map(),
        };
        // increment 必须是负数
        this.decrements = {
            [ASK]: new Map(),
            [BID]: new Map(),
        };
    }
    setBaseBook(orderbook) {
        this.baseBook = orderbook;
    }
    decQuantity(side, price, decrement) {
        const _price = price.toFixed(PRICE_DP);
        const origin = this.decrements[side].get(_price) || new Big('0');
        this.decrements[side].set(_price, origin.plus(decrement));
    }
    getQuantity(side) {
        return this.total[side];
    }
    apply() {
        for (const side of [BID, ASK]) {
            this.total[side].clear();
            this.baseBook[side].forEach(order => void this.total[side].set(order.price.toFixed(PRICE_DP), order.quantity));
            for (const [_price, decrement] of this.decrements[side]) {
                const quantity = this.total[side].get(_price);
                if (quantity) {
                    const newQuantity = quantity.minus(decrement);
                    if (quantity.gt(0))
                        this.total[side].set(_price, newQuantity);
                    else
                        this.total[side].delete(_price);
                }
                else
                    this.decrements[side].delete(_price);
            }
        }
    }
}
export { IncrementalBook as default, IncrementalBook, };
//# sourceMappingURL=incremental-book.js.map