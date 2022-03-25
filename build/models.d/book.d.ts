import { Orderbook, Side, HLike, H } from 'interfaces';
import { Context } from '../context/context';
import { StatefulLike } from 'startable';
export declare class Book<H extends HLike<H>> implements StatefulLike<Book.Snapshot> {
    private context;
    private time;
    private basebook;
    private decrements;
    private finalbookCache;
    private Orderbook;
    private Decrements;
    constructor(context: Context<H>);
    setBasebook(basebook: Orderbook<H>): void;
    decQuantity(side: Side, price: H, decrement: H): void;
    private tryApply;
    getBook(): Orderbook<H>;
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
export declare namespace Book {
    interface Snapshot {
        readonly basebook: Orderbook.Snapshot;
        readonly decrements: Decrements.Snapshot;
        readonly time: Orderbook.Snapshot['time'];
    }
}
export {};
