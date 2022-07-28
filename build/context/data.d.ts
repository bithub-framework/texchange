import { DataTypesNamespace as SecretaryDataTypesNamespace, HLike, HFactory, HStatic } from 'secretary-like';
import { OpenMakerFactory } from '../data-types/open-maker';
import { FrozenFactory, FrozenStatic } from '../data-types/frozen';
import { DatabaseTradeFactory } from '../data-types/database-trade';
import { DatabaseOrderbookFactory } from '../data-types/database-orderbook';
export declare class DataTypesNamespace<H extends HLike<H>> extends SecretaryDataTypesNamespace<H> {
    constructor(hFactory: HFactory<H>, H: HStatic<H>);
    frozenFactory: FrozenFactory<H>;
    Frozen: FrozenStatic<H>;
    OpenMaker: OpenMakerFactory<H>;
    DatabaseOrderbook: DatabaseOrderbookFactory<H>;
    DatabaseTrade: DatabaseTradeFactory<H>;
}
