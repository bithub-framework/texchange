import { Orderbook, Side, TypeRecur } from '../interfaces';
import { ModelLike } from './model';
import Big from 'big.js';
import { Context } from '../context/context';
interface Snapshot {
    basebook: Orderbook;
    decrements: {
        [side: number]: [string, Big][];
    };
    time: number;
}
declare type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
export declare class Book implements ModelLike<Snapshot, Backup, boolean> {
    private context;
    stage?: boolean;
    private time;
    private basebook;
    private decrements;
    private finalbook;
    constructor(context: Context);
    initializeStage(): void;
    setBasebook(newBasebook: Readonly<Orderbook>): void;
    decQuantity(side: Side, price: Big, decrement: Big): void;
    private apply;
    getBook(): Readonly<Orderbook>;
    capture(): Snapshot;
    restore(snapshot: Backup): void;
}
export {};
