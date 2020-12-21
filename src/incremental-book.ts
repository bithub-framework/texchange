import {
    Orderbook,
    Side, BID, ASK,
    trunc,
} from './interfaces';
import {
    EPSILON,
    QUANTITY_PRECISION,
} from './config';

class IncrementalBook {
    private baseBook: Orderbook = {
        [ASK]: [], [BID]: [], time: Number.NEGATIVE_INFINITY,
    };
    private total = {
        [ASK]: new Map<number, number>(),
        [BID]: new Map<number, number>(),
    };
    // increment 必须是负数
    private increment = {
        [ASK]: new Map<number, number>(),
        [BID]: new Map<number, number>(),
    };

    public setBaseBook(orderbook: Orderbook) {
        this.baseBook = orderbook;
    }

    public incQuantity(side: Side, price: number, increment: number) {
        const origin = this.increment[side].get(price) || 0;
        this.increment[side].set(price, trunc(
            origin + increment,
            QUANTITY_PRECISION,
        ));
    }

    public getQuantity(side: Side): Map<number, number> {
        return this.total[side];
    }

    public apply(): void {
        for (const side of [BID, ASK]) {
            this.total[side].clear();
            this.baseBook[side].forEach(order =>
                void this.total[side].set(order.price, order.quantity)
            );
            this.increment[side].forEach((increment, price) => {
                let quantity = this.total[side].get(price);
                if (quantity)
                    if ((quantity += increment) < EPSILON)
                        this.total[side].delete(price);
                    else this.total[side].set(price, quantity);
                else this.increment[side].delete(price);
            });
        }
    }
}

export {
    IncrementalBook as default,
    IncrementalBook,
}
