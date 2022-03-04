import {
	Trade,
} from 'interfaces';
import Big from 'big.js';
import { Model } from './model';
import { Context } from '../context';



export abstract class Pricing<Snapshot> extends Model<Snapshot> {
	protected abstract context: Context;
	protected abstract settlementPrice: Big;
	public abstract getSettlementPrice(): Big;
	public abstract updateTrades(trades: readonly Readonly<Trade>[]): void;
	public abstract capture(): Snapshot;
	public abstract restore(snapshot: Snapshot): void;
}
