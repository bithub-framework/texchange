import {
    Orderbook,
    Side, BID, ASK,
} from './interfaces';
import {
    PRICE_DP,
} from './config';
import Big from 'big.js';

class IncrementalBook {
    private baseBook: Orderbook = {
        [ASK]: [], [BID]: [], time: Number.NEGATIVE_INFINITY,
    };
    private total = {
        [ASK]: new Map<string, Big>(),
        [BID]: new Map<string, Big>(),
    };
    // increment 必须是负数
    private decrements = {
        [ASK]: new Map<string, Big>(),
        [BID]: new Map<string, Big>(),
    };

    public setBaseBook(orderbook: Orderbook) {
        this.baseBook = orderbook;
    }

    public decQuantity(side: Side, price: Big, decrement: Big) {
        const _price = price.toFixed(PRICE_DP);
        const origin = this.decrements[side].get(_price) || new Big(0);
        this.decrements[side].set(
            _price,
            origin.plus(decrement),
        );
    }

    public getQuantity(side: Side): Map<string, Big> {
        return this.total[side];
    }

    public apply(): void {
        for (const side of [BID, ASK]) {
            this.total[side].clear();
            this.baseBook[side].forEach(order =>
                void this.total[side].set(
                    order.price.toFixed(PRICE_DP),
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
    IncrementalBook as default,
    IncrementalBook,
}
