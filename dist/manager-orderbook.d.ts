import { Orderbook, Side, Config } from './interfaces';
import Big from 'big.js';
declare class OrderbookManager {
    private config;
    private now;
    private orderbook;
    private applied;
    private baseBook;
    private decrements;
    constructor(config: Config, now: () => number);
    getBook(): Orderbook;
    setBase(newBaseBook: Orderbook): void;
    decQuantity(side: Side, price: Big, decrement: Big): void;
    apply(): void;
}
export { OrderbookManager as default, OrderbookManager, };
