import { Orderbook, Side, TypeRecur } from '../interfaces';
import { Model } from './model';
import Big from 'big.js';
import { Context } from '../context';
interface Snapshot {
    basebook: Orderbook;
    decrements: {
        [side: number]: [string, Big][];
    };
    time: number;
}
declare type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
export declare class Book extends Model<Snapshot, Backup> {
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
export {};
