import { HLike, HStatic, Trade } from 'interfaces';
export interface DatabaseTrade<H extends HLike<H>> extends Trade<H> {
    id: string;
}
export declare class DatabaseTradeStatic<H extends HLike<H>> {
    private H;
    private Trade;
    constructor(H: HStatic<H>);
    copy(trade: DatabaseTrade<H>): DatabaseTrade<H>;
}
