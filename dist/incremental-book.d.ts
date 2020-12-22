import { Orderbook, Side, Config } from './interfaces';
import Big from 'big.js';
declare class IncrementalBook {
    private config;
    constructor(config: Config);
    private baseBook;
    private total;
    private decrements;
    setBaseBook(orderbook: Orderbook): void;
    decQuantity(side: Side, price: Big, decrement: Big): void;
    getQuantity(side: Side): Map<string, Big>;
    apply(): void;
}
export { IncrementalBook as default, IncrementalBook, };
