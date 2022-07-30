import { DataTypesNamespace as SecretaryDataTypesNamespace, HLike } from 'secretary-like';
import { BalanceFactory } from '../data-types/balance';
import { OpenMakerFactory } from '../data-types/open-maker';
import { FrozenFactory, FrozenStatic } from '../data-types/frozen';
import { DatabaseTradeFactory } from '../data-types/database-trade';
import { DatabaseOrderbookFactory } from '../data-types/database-orderbook';
export declare class DataTypesNamespace<H extends HLike<H>> extends SecretaryDataTypesNamespace<H> {
    balanceFactory: BalanceFactory<H>;
    frozenFactory: FrozenFactory<H>;
    Frozen: FrozenStatic<H>;
    openMakerFactory: OpenMakerFactory<H>;
    databaseOrderbookFactory: DatabaseOrderbookFactory<H>;
    databaseTradeFactory: DatabaseTradeFactory<H>;
}
