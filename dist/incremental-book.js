import { BID, ASK, round, } from './interfaces';
import { EPSILON, QUANTITY_PRECISION, } from './config';
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
        this.increment = {
            [ASK]: new Map(),
            [BID]: new Map(),
        };
    }
    setBaseBook(orderbook) {
        this.baseBook = orderbook;
    }
    incQuantity(side, price, increment) {
        const origin = this.increment[side].get(price) || 0;
        this.increment[side].set(price, round(origin + increment, QUANTITY_PRECISION));
    }
    getQuantity(side) {
        return this.total[side];
    }
    apply() {
        for (const side of [BID, ASK]) {
            this.total[side].clear();
            this.baseBook[side].forEach(order => void this.total[side].set(order.price, order.quantity));
            this.increment[side].forEach((increment, price) => {
                let quantity = this.total[side].get(price);
                if (quantity)
                    if ((quantity += increment) < EPSILON)
                        this.total[side].delete(price);
                    else
                        this.total[side].set(price, quantity);
                else
                    this.increment[side].delete(price);
            });
        }
    }
}
export { IncrementalBook as default, IncrementalBook, };
//# sourceMappingURL=incremental-book.js.map