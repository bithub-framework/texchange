import { Orderbook, Side, TypeRecur, StateLike } from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';
export interface Snapshot {
    baseBook: Orderbook;
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
    private baseBook;
    private decrements;
    constructor(core: Core, snapshot?: TypeRecur<Snapshot, Big, string>);
    getBook(): Orderbook;
    setBase(newBaseBook: Orderbook): void;
    decQuantity(side: Side, price: Big, decrement: Big): void;
    private apply;
    capture(): Snapshot;
}
