import {
	HLike, H,
	Trade,
} from 'secretary-like';
import { Pricing } from './pricing';
import { Context } from '../../context';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/default/types';



// 默认以最新价格作为结算价。
export class DefaultPricing<H extends HLike<H>>
	extends Pricing<H, DefaultPricing.Snapshot> {

	public constructor(
		@inject(TYPES.context)
		private context: Context<H>,
		@inject(TYPES.initialSettlementPrice)
		private settlementPrice: H,
	) { super(); }

	public updateTrades(trades: Trade<H>[]): void {
		this.settlementPrice = trades[trades.length - 1].price;
	}

	public getSettlementPrice(): H {
		return this.settlementPrice;
	}

	public capture(): DefaultPricing.Snapshot {
		return this.context.dataTypes.hFactory.capture(this.settlementPrice);
	}

	public restore(snapshot: DefaultPricing.Snapshot): void {
		this.settlementPrice = this.context.dataTypes.hFactory.restore(snapshot);
	}
}

export namespace DefaultPricing {
	export type Snapshot = H.Snapshot;
}
