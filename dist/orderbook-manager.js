import { BID, ASK, } from './interfaces';
import Big from 'big.js';
class OrderbookManager {
    constructor(config, now) {
        this.config = config;
        this.now = now;
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
    }
    setBase(orderbook) {
        this.baseBook = orderbook;
    }
    decQuantity(side, price, decrement) {
        const _price = price.toFixed(this.config.PRICE_DP);
        const origin = this.decrements[side].get(_price) || new Big(0);
        this.decrements[side].set(_price, origin.plus(decrement));
    }
    getOrderbook() {
        this.apply();
        return {
            [ASK]: [...this.total[ASK]]
                .map(([_price, quantity]) => ({
                price: new Big(_price), quantity, side: ASK,
            })),
            [BID]: [...this.total[BID]]
                .map(([_price, quantity]) => ({
                price: new Big(_price), quantity, side: BID,
            })),
            time: this.now(),
        };
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
        }
    }
}
export { OrderbookManager as default, OrderbookManager, };
//# sourceMappingURL=orderbook-manager.js.map