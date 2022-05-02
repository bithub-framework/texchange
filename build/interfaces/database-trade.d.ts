import { HLike, HStatic, Trade } from 'interfaces';
export declare type DatabaseTradeId = string;
export interface DatabaseTrade<H extends HLike<H>> extends Trade<H> {
    id: DatabaseTradeId;
}
export declare class DatabaseTradeStatic<H extends HLike<H>> {
    private H;
    private Trade;
    constructor(H: HStatic<H>);
    copy(trade: DatabaseTrade<H>): DatabaseTrade<H>;
}
