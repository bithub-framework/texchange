import { Model } from '../../model';
import {
	HLike,
	TexchangeTrade,
} from 'interfaces';



export abstract class Pricing<H extends HLike<H>, Snapshot>
	extends Model<H, Snapshot> {

	public abstract getSettlementPrice(): H;
	public abstract updateTrades(
		trades: readonly TexchangeTrade<H>[],
	): void;
}
