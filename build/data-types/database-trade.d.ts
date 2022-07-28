import { HLike, Trade, TradeFactory } from 'secretary-like';
export declare type DatabaseTradeId = string;
export interface DatabaseTrade<H extends HLike<H>> extends Trade<H> {
    id: DatabaseTradeId;
}
export declare class DatabaseTradeFactory<H extends HLike<H>> {
    private tradeFactory;
    constructor(tradeFactory: TradeFactory<H>);
    copy(trade: DatabaseTrade<H>): DatabaseTrade<H>;
}
