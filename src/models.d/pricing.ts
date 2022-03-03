import { Trade } from 'interfaces';
import Big from 'big.js';
import { Model, Stringified } from './model';
import { Context } from '../context';



export abstract class Pricing<Snapshot>
	extends Model<Snapshot> {

	constructor(
		protected context: Context,
		protected settlementPrice: Big,
	) {
		super();
	}

	public abstract getSettlementPrice(): Big;
	public abstract updateTrades(trades: readonly Readonly<Trade>[]): void;
	public abstract capture(): Snapshot;
	public abstract restore(backup: Stringified<Snapshot>): void;
}

export class DefaultPricing extends Pricing<Snapshot> {
	public updateTrades(trades: readonly Readonly<Trade>[]): void {
		this.settlementPrice = trades[trades.length - 1].price;
	}

	public getSettlementPrice(): Big {
		return this.settlementPrice;
	}

	public capture(): Snapshot {
		return this.settlementPrice;
	}

	public restore(snapshot: Backup): void {
		this.settlementPrice = new Big(snapshot);
	}
}

export type Snapshot = Big;
export type Backup = Stringified<Snapshot>;
