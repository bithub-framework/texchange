import { HLike, OrderbookLike, Orderbook, OrderbookFactory, BookOrderFactory } from 'secretary-like';
export declare type DatabaseOrderbookId = string;
export interface DatabaseOrderbookLike<H extends HLike<H>> extends OrderbookLike<H>, DatabaseOrderbook.Source<H> {
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
export declare class DatabaseOrderbookFactory<H extends HLike<H>> {
    private bookOrderFactory;
    private orderbookFactory;
    constructor(bookOrderFactory: BookOrderFactory<H>, orderbookFactory: OrderbookFactory<H>);
    new(source: DatabaseOrderbook.Source<H>): DatabaseOrderbookLike<H>;
    capture(databaseOrderbook: DatabaseOrderbookLike<H>): DatabaseOrderbook.Snapshot;
}
