import { DataNamespace as SecretaryDataNamespace, HLike, HFactory, HStatic } from 'secretary-like';
import { OpenMakerFactory } from './open-maker';
import { FrozenFactory, FrozenStatic } from './frozen';
import { DatabaseTradeFactory } from './database-trade';
import { DatabaseOrderbookFactory } from './database-orderbook';
export declare class DataNamespace<H extends HLike<H>> extends SecretaryDataNamespace<H> {
    constructor(hFactory: HFactory<H>, H: HStatic<H>);
    frozenFactory: FrozenFactory<H>;
    Frozen: FrozenStatic<H>;
    OpenMaker: OpenMakerFactory<H>;
    DatabaseOrderbook: DatabaseOrderbookFactory<H>;
    DatabaseTrade: DatabaseTradeFactory<H>;
}
