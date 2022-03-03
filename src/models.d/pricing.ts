import {
	Trade,
	TypeRecur,
} from '../interfaces';
import Big from 'big.js';
import { Model } from './model';
import { Context } from '../context';



export abstract class Pricing<Snapshot, Backup>
	extends Model<Snapshot, Backup> {

	constructor(
		protected context: Context,
		protected settlementPrice: Big,
	) {
		super(context);
	}

	public abstract getSettlementPrice(): Big;
	public abstract updateTrades(trades: readonly Readonly<Trade>[]): void;
	public abstract capture(): Snapshot;
	public abstract restore(backup: Backup): void;
}

export class DefaultPricing extends Pricing<Snapshot, Backup> {
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

type Snapshot = Big;
type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
