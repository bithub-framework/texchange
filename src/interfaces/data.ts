import {
	DataNamespace as SecretaryDataNamespace,
	HLike, HFactory, HStatic,
} from 'secretary-like';
import { OpenMakerFactory } from './open-maker';
import { FrozenFactory, FrozenStatic } from './frozen';
import { DatabaseTradeFactory } from './database-trade';
import { DatabaseOrderbookFactory } from './database-orderbook';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


export class DataNamespace<H extends HLike<H>> extends SecretaryDataNamespace<H> {
	public constructor(
		@inject(TYPES.hFactory)
		hFactory: HFactory<H>,
		@inject(TYPES.hStatic)
		H: HStatic<H>,
	) {
		super(hFactory, H);
	}

	public frozenFactory = new FrozenFactory<H>(this.hFactory);
	public Frozen = new FrozenStatic<H>(this.hFactory);
	public OpenMaker = new OpenMakerFactory<H>(this.hFactory, this.frozenFactory, this.openOrderFactory);
	public DatabaseOrderbook = new DatabaseOrderbookFactory<H>(this.orderbookFactory);
	public DatabaseTrade = new DatabaseTradeFactory<H>(this.tradeFactory);
}
