import { HLike, Orderbook, OrderbookFactory } from 'secretary-like';
export declare type DatabaseOrderbookId = string;
export interface DatabaseOrderbook<H extends HLike<H>> extends Orderbook<H> {
    id: DatabaseOrderbookId;
}
export declare class DatabaseOrderbookFactory<H extends HLike<H>> {
    private orderbookFactory;
    constructor(orderbookFactory: OrderbookFactory<H>);
    copy(databaseOrderbook: DatabaseOrderbook<H>): DatabaseOrderbook<H>;
}
