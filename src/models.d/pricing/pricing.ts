import { Model } from '../../model';
import {
	HLike,
	ConcreteTrade,
} from 'interfaces';



export abstract class Pricing<H extends HLike<H>, Snapshot>
	extends Model<H, Snapshot> {

	public abstract getSettlementPrice(): H;
	public abstract updateTrades(
		trades: readonly ConcreteTrade<H>[],
	): void;
}
