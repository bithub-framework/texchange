import { DataStatic as SecretaryDataStatic, HLike, HStatic } from 'secretary-like';
import { OpenMakerStatic } from './open-maker';
import { FrozenStatic } from './frozen/frozen';
import { DatabaseTradeStatic } from './database-trade';
import { DatabaseOrderbookStatic } from './database-orderbook';
export declare class DataStatic<H extends HLike<H>> extends SecretaryDataStatic<H> {
    constructor(H: HStatic<H>);
    Frozen: FrozenStatic<H>;
    OpenMaker: OpenMakerStatic<H>;
    DatabaseOrderbook: DatabaseOrderbookStatic<H>;
    DatabaseTrade: DatabaseTradeStatic<H>;
}
