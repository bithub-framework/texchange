import { Orderbook, ConcreteOrderbook, Side, HLike, H, HStatic } from 'interfaces';
import { Model } from '../model';
import { Context } from '../context';
export declare class Book<H extends HLike<H>> extends Model<H, Book.Snapshot> {
    protected readonly context: Context<H>;
    private time;
    private basebook;
    private decrements;
    private finalbookCache;
    private Orderbook;
    private Decrements;
    constructor(context: Context<H>);
    setBasebook(newBasebook: ConcreteOrderbook<H>): void;
    decQuantity(side: Side, price: H, decrement: H): void;
    private apply;
    getBook(): ConcreteOrderbook<H>;
    capture(): Book.Snapshot;
    restore(snapshot: Book.Snapshot): void;
}
interface Decrements<H extends HLike<H>> {
    [side: Side]: Map<string, H>;
}
declare namespace Decrements {
    interface Snapshot {
        readonly [side: Side]: readonly (readonly [string, H.Snapshot])[];
    }
}
export declare class DecrementsStatic<H extends HLike<H>> {
    private H;
    constructor(H: HStatic<H>);
    capture(decrements: Decrements<H>): Decrements.Snapshot;
    restore(snapshot: Decrements.Snapshot): Decrements<H>;
}
export declare namespace Book {
    interface Snapshot {
        readonly basebook: Orderbook.Snapshot;
        readonly decrements: Decrements.Snapshot;
        readonly time: Orderbook.Snapshot['time'];
    }
}
export {};
