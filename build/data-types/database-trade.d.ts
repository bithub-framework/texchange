import { HLike, HFactory, Trade, TradeFactory, Side, CompositeDataFactoryLike, CompositeDataLike } from 'secretary-like';
export declare type DatabaseTradeId = string;
export interface DatabaseTrade<H extends HLike<H>> extends Trade<H>, DatabaseTrade.Source<H>, CompositeDataLike {
    id: DatabaseTradeId;
}
declare class ConcreteDatabaseTrade<H extends HLike<H>> implements DatabaseTrade<H> {
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
export declare class DatabaseTradeFactory<H extends HLike<H>> implements CompositeDataFactoryLike<DatabaseTrade.Source<H>, DatabaseTrade<H>, DatabaseTrade.Snapshot> {
    private hFactory;
    private tradeFactory;
    constructor(hFactory: HFactory<H>, tradeFactory: TradeFactory<H>);
    new(source: DatabaseTrade.Source<H>): ConcreteDatabaseTrade<H>;
    capture(trade: DatabaseTrade<H>): DatabaseTrade.Snapshot;
    restore(snapshot: DatabaseTrade.Snapshot): DatabaseTrade<H>;
}
export {};
