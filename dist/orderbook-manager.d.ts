import { Orderbook, Side, Config } from './interfaces';
import Big from 'big.js';
declare class OrderbookManager {
    private config;
    private now;
    constructor(config: Config, now: () => number);
    private baseBook;
    private total;
    private decrements;
    setBase(orderbook: Orderbook): void;
    decQuantity(side: Side, price: Big, decrement: Big): void;
    getOrderbook(): Orderbook;
    private apply;
}
export { OrderbookManager as default, OrderbookManager, };
