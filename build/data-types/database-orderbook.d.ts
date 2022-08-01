import { HLike, Orderbook, OrderbookFactory, BookOrderFactory, CompositeDataFactoryLike, CompositeDataLike } from 'secretary-like';
export declare type DatabaseOrderbookId = string;
export interface DatabaseOrderbook<H extends HLike<H>> extends Orderbook<H>, DatabaseOrderbook.Source<H>, CompositeDataLike {
    id: DatabaseOrderbookId;
}
export declare namespace DatabaseOrderbook {
    interface Source<H extends HLike<H>> extends Orderbook.Source<H> {
        id: DatabaseOrderbookId;
    }
    interface Snapshot extends Orderbook.Snapshot {
        id: DatabaseOrderbookId;
    }
}
export declare class DatabaseOrderbookFactory<H extends HLike<H>> implements CompositeDataFactoryLike<DatabaseOrderbook.Source<H>, DatabaseOrderbook<H>, DatabaseOrderbook.Snapshot> {
    private bookOrderFactory;
    private orderbookFactory;
    constructor(bookOrderFactory: BookOrderFactory<H>, orderbookFactory: OrderbookFactory<H>);
    create(source: DatabaseOrderbook.Source<H>): DatabaseOrderbook<H>;
    capture(databaseOrderbook: DatabaseOrderbook<H>): DatabaseOrderbook.Snapshot;
    restore(snapshot: DatabaseOrderbook.Snapshot): DatabaseOrderbook<H>;
}
