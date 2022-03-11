import { Orderbook, Side, ReadonlyRecur, JsonCompatible } from 'interfaces';
import { Model } from '../model';
import Big from 'big.js';
import { Context } from '../context';
export declare class Book extends Model<Book.Snapshot> {
    protected readonly context: Context;
    private time;
    private basebook;
    private decrements;
    private finalbook;
    constructor(context: Context);
    setBasebook(newBasebook: Readonly<Orderbook>): void;
    decQuantity(side: Side, price: Big, decrement: Big): void;
    private apply;
    getBook(): Readonly<Orderbook>;
    capture(): Book.Snapshot;
    restore(snapshot: Book.Snapshot): void;
}
export declare namespace Book {
    interface SnapshotStruct {
        basebook: Orderbook;
        decrements: {
            [side: number]: [string, Big][];
        };
        time: number;
    }
    export type Snapshot = ReadonlyRecur<JsonCompatible<SnapshotStruct>>;
    export {};
}
