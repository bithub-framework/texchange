import { HLike, HStatic, Orderbook } from 'interfaces';
export declare type DatabaseOrderbookId = string;
export interface DatabaseOrderbook<H extends HLike<H>> extends Orderbook<H> {
    id: DatabaseOrderbookId;
}
export declare class DatabaseOrderbookStatic<H extends HLike<H>> {
    private H;
    private Orderbook;
    constructor(H: HStatic<H>);
    copy(orderbook: DatabaseOrderbook<H>): DatabaseOrderbook<H>;
}
