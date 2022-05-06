import { DataStatic as SecretaryDataStatic, HLike } from 'secretary-like';
import { OpenMakerStatic } from './open-maker';
import { FrozenStatic } from './frozen';
import { DatabaseTradeStatic } from './database-trade';
import { DatabaseOrderbookStatic } from './database-orderbook';
export declare class DataStatic<H extends HLike<H>> extends SecretaryDataStatic<H> {
    Frozen: FrozenStatic<H>;
    OpenMaker: OpenMakerStatic<H>;
    DatabaseOrderbook: DatabaseOrderbookStatic<H>;
    DatabaseTrade: DatabaseTradeStatic<H>;
}
