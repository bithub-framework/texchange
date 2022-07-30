import { HLike, HFactory, Trade, TradeFactory, TradeLike, Side } from 'secretary-like';
export declare type DatabaseTradeId = string;
export interface DatabaseTradeLike<H extends HLike<H>> extends TradeLike<H>, DatabaseTrade.Source<H> {
    id: DatabaseTradeId;
}
declare class DatabaseTrade<H extends HLike<H>> implements DatabaseTradeLike<H> {
    private factory;
    side: Side;
    price: H;
    quantity: H;
    time: number;
    id: DatabaseTradeId;
    constructor(source: DatabaseTrade.Source<H>, factory: DatabaseTradeFactory<H>);
    toJSON(): unknown;
    toString(): string;
}
export declare namespace DatabaseTrade {
    interface Source<H extends HLike<H>> extends Trade.Source<H> {
        id: DatabaseTradeId;
    }
    interface Snapshot extends Trade.Snapshot {
        id: DatabaseTradeId;
    }
}
export declare class DatabaseTradeFactory<H extends HLike<H>> {
    private hFactory;
    private tradeFactory;
    constructor(hFactory: HFactory<H>, tradeFactory: TradeFactory<H>);
    new(source: DatabaseTrade.Source<H>): DatabaseTrade<H>;
    capture(trade: DatabaseTradeLike<H>): DatabaseTrade.Snapshot;
}
export {};
