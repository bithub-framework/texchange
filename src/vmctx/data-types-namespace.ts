import {
	DataTypesNamespace as SecretaryDataTypesNamespace,
	HLike,
} from 'secretary-like';
import { OpenMakerFactory } from '../data-types/open-maker';
import { FrozenFactory, FrozenStatic } from '../data-types/frozen';
import { DatabaseTradeFactory } from '../data-types/database-trade';
import { DatabaseOrderbookFactory } from '../data-types/database-orderbook';


export class DataTypesNamespace<H extends HLike<H>> extends SecretaryDataTypesNamespace<H> {
	public frozenFactory = new FrozenFactory<H>(this.hFactory);
	public Frozen = new FrozenStatic<H>(this.hFactory, this.positionFactory);
	public openMakerFactory = new OpenMakerFactory<H>(this.hFactory, this.frozenFactory, this.openOrderFactory);
	public databaseOrderbookFactory = new DatabaseOrderbookFactory<H>(this.bookOrderFactory, this.orderbookFactory);
	public databaseTradeFactory = new DatabaseTradeFactory<H>(this.hFactory, this.tradeFactory);
}
