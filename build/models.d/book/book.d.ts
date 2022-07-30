import { OrderbookLike, Orderbook, OpenOrderLike, Side, HLike, MarketSpecLike } from 'secretary-like';
import { VirtualMachineContextLike } from '../../vmctx';
import { StatefulLike } from '../../stateful-like';
import { Decrements } from './decrements';
export declare class Book<H extends HLike<H>> implements StatefulLike<Book.Snapshot> {
    private context;
    private marketSpec;
    private Decrements;
    private time;
    private basebook;
    private decrements;
    private finalbookCache;
    constructor(context: VirtualMachineContextLike<H>, marketSpec: MarketSpecLike<H>);
    setBasebook(basebook: OrderbookLike<H>): void;
    decQuantity(side: Side, price: H, decrement: H): void;
    private tryApply;
    getOrderbook(): OrderbookLike<H>;
    lineUp(order: OpenOrderLike<H>): H;
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
