import {
	Trade,
	TypeRecur,
} from '../interfaces';
import Big from 'big.js';
import { Startable, ReadyState, StatefulLike } from 'startable';
import assert = require('assert');
import { Context } from '../context/context';



export abstract class Pricing<Snapshot>
	implements StatefulLike<Snapshot, TypeRecur<Snapshot, Big, string>> {

	constructor(
		protected context: Context,
		protected settlementPrice: Big,
	) { }

	public abstract getSettlementPrice(): Big;
	public abstract updateTrades(trades: readonly Readonly<Trade>[]): void;
	public abstract capture(): Snapshot;
	public abstract restore(backup: TypeRecur<Snapshot, Big, string>): void;
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

type Snapshot = Big;
type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
