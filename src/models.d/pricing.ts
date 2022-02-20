import {
	Trade,
	TypeRecur,
} from '../interfaces';
import Big from 'big.js';
import { ModelLike } from './model';
import { Context } from '../context';



export abstract class Pricing<Snapshot, Stage>
	implements ModelLike<Snapshot, TypeRecur<Snapshot, Big, string>, Stage> {
	public abstract stage?: Stage;

	constructor(
		protected context: Context,
		protected settlementPrice: Big,
	) { }

	public abstract initializeStage(): void;
	public abstract getSettlementPrice(): Big;
	public abstract updateTrades(trades: readonly Readonly<Trade>[]): void;
	public abstract capture(): Snapshot;
	public abstract restore(backup: TypeRecur<Snapshot, Big, string>): void;
}

export class DefaultPricing extends Pricing<Snapshot, boolean> {
	public stage?: boolean;

	public initializeStage(): void {
		this.stage = false;
	}

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
