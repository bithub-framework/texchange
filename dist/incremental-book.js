import { BID, ASK, } from './interfaces';
import { EPSILON, } from './config';
class IncrementalBook {
    constructor() {
        this.baseBook = {
            [ASK]: [], [BID]: [], time: Number.NEGATIVE_INFINITY,
        };
        this.total = {
            [ASK]: new Map(),
            [BID]: new Map(),
        };
        this.increment = {
            [ASK]: new Map(),
            [BID]: new Map(),
        };
    }
    setBase(origin) {
        this.baseBook = origin;
    }
    incQuantity(side, price, increment) {
        const origin = this.increment[side].get(price) || 0;
        this.increment[side].set(price, origin + increment);
    }
    getQuantity(side) {
        return this.total[side];
    }
    apply() {
        for (const side of [BID, ASK]) {
            this.total[side].clear();
            this.baseBook[side].forEach(order => void this.total[side].set(order.price, order.quantity));
            this.increment[side].forEach((increment, price) => {
                if (Math.abs(increment) < EPSILON)
                    return void this.increment[side].delete(price);
                let quantity;
                if (quantity = this.total[side].get(price)) {
                    if ((quantity += increment) < EPSILON)
                        this.total[side].delete(price);
                    else
                        this.total[side].set(price, quantity);
                }
                else
                    this.increment[side].delete(price);
            });
        }
    }
}
export { IncrementalBook as default, IncrementalBook, };
//# sourceMappingURL=incremental-book.js.map