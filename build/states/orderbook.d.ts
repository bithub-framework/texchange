import { Orderbook, Side, StateLike, BookOrder, Parsed } from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';
export interface Snapshot {
    basebook: Orderbook;
    decrements: {
        [side: number]: [string, Big][];
    };
    time: number;
}
export declare class StateOrderbook implements StateLike<Snapshot>, Orderbook {
    private core;
    [side: number]: BookOrder[];
    time: number;
    private applied;
    private basebook;
    private decrements;
    constructor(core: Core);
    setBasebook(newBasebook: Orderbook): void;
    decQuantity(side: Side, price: Big, decrement: Big): void;
    private apply;
    capture(): Snapshot;
    restore(snapshot: Parsed<Snapshot>): void;
}
