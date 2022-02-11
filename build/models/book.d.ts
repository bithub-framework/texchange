import { Orderbook, Side, BookOrder, TypeRecur } from '../interfaces';
import { StatefulLike } from 'startable';
import Big from 'big.js';
import { type Hub } from '../hub';
export declare namespace Book {
    interface Snapshot {
        basebook: Orderbook;
        decrements: {
            [side: number]: [string, Big][];
        };
        time: number;
    }
    type Backup = TypeRecur<Snapshot, Big, string>;
}
export import Snapshot = Book.Snapshot;
export import Backup = Book.Backup;
export declare class Book implements StatefulLike<Snapshot, Backup>, Orderbook {
    private core;
    [side: number]: BookOrder[];
    time: number;
    private applied;
    private basebook;
    private decrements;
    constructor(core: Hub);
    setBasebook(newBasebook: Orderbook): void;
    decQuantity(side: Side, price: Big, decrement: Big): void;
    private apply;
    capture(): Snapshot;
    restore(snapshot: Backup): void;
}
