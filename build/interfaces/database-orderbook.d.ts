import { HLike, HStatic, Orderbook, BookOrder } from 'secretary-like';
export declare type DatabaseOrderbookId = string;
export declare class DatabaseOrderbook<H extends HLike<H>> extends Orderbook<H> {
    id: DatabaseOrderbookId;
    constructor(bids: BookOrder<H>[], asks: BookOrder<H>[], time: number, id: DatabaseOrderbookId);
}
export declare class DatabaseOrderbookStatic<H extends HLike<H>> {
    private H;
    private Orderbook;
    constructor(H: HStatic<H>);
    copy(databaseOrderbook: DatabaseOrderbook<H>): DatabaseOrderbook<H>;
}
