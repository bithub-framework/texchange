import { Orderbook, Side, Config, MakerOrder } from './interfaces';
import Big from 'big.js';
declare class OrderbookManager implements Orderbook {
    private config;
    private now;
    [side: number]: MakerOrder[];
    private applied;
    time: number;
    private baseBook;
    private total;
    private decrements;
    constructor(config: Config, now: () => number);
    private _ASK;
    private _BID;
    setBase(orderbook: Orderbook): void;
    decQuantity(side: Side, price: Big, decrement: Big): void;
    apply(): void;
}
export { OrderbookManager as default, OrderbookManager, };
