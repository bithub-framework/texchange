import {
    Orderbook,
    Side, BID, ASK,
    Config,
    MakerOrder,
} from './interfaces';
import Big from 'big.js';
import assert from 'assert';

class OrderbookManager implements Orderbook {
    [side: number]: MakerOrder[];

    private applied = false;
    public time = Number.NEGATIVE_INFINITY;
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

    constructor(
        private config: Config,
        private now: () => number,
    ) {
        this.apply();

        // @ts-ignore
        OrderbookManager.prototype.toJSON = function (): Orderbook {
            return {
                [BID]: this[BID],
                [ASK]: this[ASK],
                time: this.time,
            }
        }
    }

    private _ASK!: MakerOrder[];
    public get [ASK]() {
        assert(this.applied);
        return this._ASK;
    }
    private set [ASK](v: MakerOrder[]) {
        this._ASK = v;
    }

    private _BID!: MakerOrder[];
    public get [BID]() {
        assert(this.applied);
        return this._BID;
    }
    private set [BID](v: MakerOrder[]) {
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
            this[side] = [...this.total[side]]
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
