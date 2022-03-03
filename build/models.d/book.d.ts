import { Orderbook, Side } from 'interfaces';
import { Model, Stringified } from './model';
import Big from 'big.js';
import { Context } from '../context';
export interface Snapshot {
    basebook: Orderbook;
    decrements: {
        [side: number]: [string, Big][];
    };
    time: number;
}
export declare type Backup = Stringified<Snapshot>;
export declare class Book extends Model<Snapshot> {
    protected context: Context;
    private time;
    private basebook;
    private decrements;
    private finalbook;
    constructor(context: Context);
    setBasebook(newBasebook: Readonly<Orderbook>): void;
    decQuantity(side: Side, price: Big, decrement: Big): void;
    private apply;
    getBook(): Readonly<Orderbook>;
    capture(): Snapshot;
    restore(snapshot: Backup): void;
}
