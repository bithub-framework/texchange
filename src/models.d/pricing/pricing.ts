import {
	Trade,
} from 'interfaces';
import Big from 'big.js';
import { Model } from '../../model';



export abstract class Pricing<Snapshot> extends Model<Snapshot> {
	public abstract getSettlementPrice(): Big;
	public abstract updateTrades(trades: readonly Readonly<Trade>[]): void;
}
