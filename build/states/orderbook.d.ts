import { Orderbook, Side } from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';
declare class StateOrderbook {
    private core;
    private orderbook;
    private applied;
    private baseBook;
    private decrements;
    constructor(core: Core);
    getBook(): Orderbook;
    setBase(newBaseBook: Orderbook): void;
    decQuantity(side: Side, price: Big, decrement: Big): void;
    apply(): void;
}
export { StateOrderbook as default, StateOrderbook, };
