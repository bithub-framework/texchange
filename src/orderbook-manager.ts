import {
    Orderbook,
    Side, BID, ASK,
    Config,
} from './interfaces';
import Big from 'big.js';

class OrderbookManager {
    constructor(
        private config: Config,
        private now: () => number,
    ) { }

    private baseBook: Orderbook = {
        [ASK]: [], [BID]: [], time: Number.NEGATIVE_INFINITY,
    };
    private total = {
        [ASK]: new Map<string, Big>(),
        [BID]: new Map<string, Big>(),
    };
    // decrement 必须是正数
    private decrements = {
        [ASK]: new Map<string, Big>(),
        [BID]: new Map<string, Big>(),
    };

    public setBase(orderbook: Orderbook) {
        this.baseBook = orderbook;
    }

    public decQuantity(side: Side, price: Big, decrement: Big) {
        const _price = price.toFixed(this.config.PRICE_DP);
        const origin = this.decrements[side].get(_price) || new Big(0);
        this.decrements[side].set(
            _price,
            origin.plus(decrement),
        );
    }

    public getOrderbook(): Orderbook {
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

    private apply(): void {
        for (const side of [BID, ASK]) {
            this.total[side].clear();
            this.baseBook[side].forEach(order =>
                void this.total[side].set(
                    order.price.toFixed(this.config.PRICE_DP),
                    order.quantity,
                ));
            for (const [_price, decrement] of this.decrements[side]) {
                const quantity = this.total[side].get(_price);
                if (quantity) {
                    const newQuantity = quantity.minus(decrement);
                    if (quantity.gt(0))
                        this.total[side].set(_price, newQuantity);
                    else this.total[side].delete(_price);
                } else this.decrements[side].delete(_price);
            }
        }
    }
}

export {
    OrderbookManager as default,
    OrderbookManager,
}
