import { BID, ASK, } from './interfaces';
import Big from 'big.js';
import assert from 'assert';
class OrderbookManager {
    constructor(config, now) {
        this.config = config;
        this.now = now;
        this.applied = false;
        this.time = Number.NEGATIVE_INFINITY;
        this.baseBook = {
            [ASK]: [], [BID]: [], time: Number.NEGATIVE_INFINITY,
        };
        this.total = {
            [ASK]: new Map(),
            [BID]: new Map(),
        };
        // decrement 必须是正数
        this.decrements = {
            [ASK]: new Map(),
            [BID]: new Map(),
        };
        this.apply();
    }
    get [ASK]() {
        assert(this.applied);
        return this._ASK;
    }
    set [ASK](v) {
        this._ASK = v;
    }
    get [BID]() {
        assert(this.applied);
        return this._BID;
    }
    set [BID](v) {
        this._BID = v;
    }
    setBase(orderbook) {
        this.baseBook = orderbook;
        this.time = this.now();
        this.applied = false;
    }
    decQuantity(side, price, decrement) {
        const _price = price.toFixed(this.config.PRICE_DP);
        const origin = this.decrements[side].get(_price) || new Big(0);
        this.decrements[side].set(_price, origin.plus(decrement));
        this.time = this.now();
        this.applied = false;
    }
    apply() {
        for (const side of [BID, ASK]) {
            this.total[side].clear();
            this.baseBook[side].forEach(order => void this.total[side].set(order.price.toFixed(this.config.PRICE_DP), order.quantity));
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
            this[side] = [...this.total[side]]
                .map(([_price, quantity]) => ({
                price: new Big(_price), quantity, side,
            }));
        }
        this.applied = true;
    }
    toJSON() {
        return {
            [BID]: this[BID],
            [ASK]: this[ASK],
            time: this.time,
        };
    }
}
export { OrderbookManager as default, OrderbookManager, };
//# sourceMappingURL=manager-orderbook.js.map