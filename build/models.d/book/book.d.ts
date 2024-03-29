import { Orderbook, OpenOrder, Side, HLike, MarketSpec } from 'secretary-like';
import { VirtualMachineContextLike } from '../../vmctx';
import { StatefulLike } from '../../stateful-like';
import { Decrements } from './decrements';
export declare class Book<H extends HLike<H>> implements StatefulLike<Book.Snapshot> {
    private vmctx;
    private marketSpec;
    private Decrements;
    private time;
    private basebook;
    private decrements;
    private finalbookCache;
    constructor(vmctx: VirtualMachineContextLike<H>, marketSpec: MarketSpec<H>);
    setBasebook(basebook: Orderbook<H>): void;
    decQuantity(side: Side, price: H, decrement: H): void;
    private tryApply;
    getOrderbook(): Orderbook<H>;
    lineUp(order: OpenOrder<H>): H;
    capture(): Book.Snapshot;
    restore(snapshot: Book.Snapshot): void;
}
export declare namespace Book {
    interface Snapshot {
        basebook: Orderbook.Snapshot;
        decrements: Decrements.Snapshot;
        time: Orderbook.Snapshot['time'];
    }
}
