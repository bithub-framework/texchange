import {
	Trade,
	JsonCompatible,
	ReadonlyRecur,
} from 'interfaces';
import Big from 'big.js';
import { Pricing } from '../pricing';
import { Context } from '../../context';



export class DefaultPricing extends Pricing<Snapshot> {
	constructor(
		protected readonly context: Context,
		protected settlementPrice: Big,
	) { super(); }

	public updateTrades(trades: readonly Readonly<Trade>[]): void {
		this.settlementPrice = trades[trades.length - 1].price;
	}

	public getSettlementPrice(): Big {
		return this.settlementPrice;
	}

	public capture(): Snapshot {
		return this.settlementPrice.toString();
	}

	public restore(snapshot: Snapshot): void {
		this.settlementPrice = new Big(snapshot);
	}
}

type SnapshotStruct = Big;
export namespace DefaultPricing {
	export type Snapshot = ReadonlyRecur<JsonCompatible<SnapshotStruct>>;
}
import Snapshot = DefaultPricing.Snapshot;
