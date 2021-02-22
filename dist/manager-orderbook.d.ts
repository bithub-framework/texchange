import { Orderbook, Side, Config, BookOrder } from './interfaces';
import Big from 'big.js';
declare class OrderbookManager implements Orderbook {
    private config;
    private now;
    [side: number]: BookOrder[];
    private applied;
    time: number;
    private baseBook;
    private total;
    private decrements;
    constructor(config: Config, now: () => number);
    private _ASK;
    get [Side.ASK](): BookOrder[];
    set [Side.ASK](v: BookOrder[]);
    private _BID;
    get [Side.BID](): BookOrder[];
    set [Side.BID](v: BookOrder[]);
    setBase(orderbook: Orderbook): void;
    decQuantity(side: Side, price: Big, decrement: Big): void;
    apply(): void;
    toJSON(): Orderbook;
}
export { OrderbookManager as default, OrderbookManager, };
