import { Orderbook, Side, StateLike, Parsed } from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';
export interface Snapshot {
    basebook: Orderbook;
    decrements: {
        [side: number]: [string, Big][];
    };
    time: number;
}
export declare class StateOrderbook implements StateLike<Snapshot> {
    private core;
    private time;
    private orderbook;
    private applied;
    private basebook;
    private decrements;
    constructor(core: Core);
    getOrderbook(): Orderbook;
    setBasebook(newBasebook: Orderbook): void;
    decQuantity(side: Side, price: Big, decrement: Big): void;
    private apply;
    capture(): Snapshot;
    restore(snapshot: Parsed<Snapshot>): void;
}
