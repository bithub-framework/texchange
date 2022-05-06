import {
	DataStatic as SecretaryDataStatic,
	HLike,
} from 'secretary-like';
import { OpenMakerStatic } from './open-maker';
import { FrozenStatic } from './frozen';
import { DatabaseTradeStatic } from './database-trade';
import { DatabaseOrderbookStatic } from './database-orderbook';


export class DataStatic<H extends HLike<H>> extends SecretaryDataStatic<H> {
	public Frozen = new FrozenStatic(this.H);
	public OpenMaker = new OpenMakerStatic(this.H, this.Frozen);
	public DatabaseOrderbook = new DatabaseOrderbookStatic(this.H);
	public DatabaseTrade = new DatabaseTradeStatic(this.H);
}
