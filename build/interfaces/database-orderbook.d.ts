import { HLike, Orderbook, OrderbookFactory, BookOrder } from 'secretary-like';
export declare type DatabaseOrderbookId = string;
export declare class DatabaseOrderbook<H extends HLike<H>> extends Orderbook<H> {
    id: DatabaseOrderbookId;
    constructor(bids: BookOrder<H>[], asks: BookOrder<H>[], time: number, id: DatabaseOrderbookId);
}
export declare class DatabaseOrderbookFactory<H extends HLike<H>> {
    private orderbookFactory;
    constructor(orderbookFactory: OrderbookFactory<H>);
    copy(databaseOrderbook: DatabaseOrderbook<H>): DatabaseOrderbook<H>;
}
