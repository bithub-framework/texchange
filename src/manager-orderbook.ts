import {
    Orderbook,
    Side,
    Config,
    BookOrder,
} from './interfaces';
import Big from 'big.js';
import assert from 'assert';

class OrderbookManager implements Orderbook {
    [side: number]: BookOrder[];

    private applied = false;
    public time = Number.NEGATIVE_INFINITY;
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

    private _ASK!: BookOrder[];
    public get [Side.ASK]() {
        assert(this.applied);
        return this._ASK;
    }
    private set [Side.ASK](v: BookOrder[]) {
        this._ASK = v;
    }

    private _BID!: BookOrder[];
    public get [Side.BID]() {
        assert(this.applied);
        return this._BID;
    }
    private set [Side.BID](v: BookOrder[]) {
        this._BID = v;
    }

    public setBase(orderbook: Orderbook) {
        this.baseBook = orderbook;
        this.time = this.now();
        this.applied = false;
    }

    public decQuantity(side: Side, price: Big, decrement: Big) {
        const _price = price.toFixed(this.config.PRICE_DP);
        const origin = this.decrements[side].get(_price) || new Big(0);
        this.decrements[side].set(
            _price,
            origin.plus(decrement),
        );
        this.time = this.now();
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
            this[side] = [...this.total[side]]
                .map(([_price, quantity]) => ({
                    price: new Big(_price), quantity, side,
                }));
        }
        this.applied = true;
    }

    public toJSON(): Orderbook {
        return {
            [Side.BID]: this[Side.BID],
            [Side.ASK]: this[Side.ASK],
            time: this.time,
        }
    }
}

export {
    OrderbookManager as default,
    OrderbookManager,
}
