import {
    Orderbook,
    Side,
    Config,
} from './interfaces';
import Big from 'big.js';
import assert from 'assert';

class OrderbookManager {
    private orderbook: Orderbook = {
        time: Number.NEGATIVE_INFINITY,
    };
    private applied = false;
    private baseBook: Orderbook = {
        [Side.ASK]: [], [Side.BID]: [], time: Number.NEGATIVE_INFINITY,
    };
    private total = {
        [Side.ASK]: new Map<string, Big>(),
        [Side.BID]: new Map<string, Big>(),
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

    public setBase(orderbook: Orderbook) {
        this.baseBook = orderbook;
        this.orderbook.time = this.now();
        this.applied = false;
    }

    public decQuantity(side: Side, price: Big, decrement: Big) {
        const _price = price.toFixed(this.config.PRICE_DP);
        const origin = this.decrements[side].get(_price) || new Big(0);
        this.decrements[side].set(
            _price,
            origin.plus(decrement),
        );
        this.orderbook.time = this.now();
        this.applied = false;
    }

    public apply(): void {
        for (const side of [Side.BID, Side.ASK]) {
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
            this.orderbook[side] = [...this.total[side]]
                .map(([_price, quantity]) => ({
                    price: new Big(_price), quantity, side,
                }));
        }
        this.applied = true;
    }
}

export {
    OrderbookManager as default,
    OrderbookManager,
}
