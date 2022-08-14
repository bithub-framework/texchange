import {
	HLike, H,
	Trade,
} from 'secretary-like';
import { Pricing } from './pricing';
import { VirtualMachineContextLike } from '../../vmctx';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/default/types';



// 默认以最新价格作为结算价。
export class DefaultPricing<H extends HLike<H>>
	extends Pricing<H, DefaultPricing.Snapshot> {

	public constructor(
		@inject(TYPES.vmctx)
		private vmctx: VirtualMachineContextLike<H>,
		@inject(TYPES.MODELS.initialSettlementPrice)
		private settlementPrice: H,
	) { super(); }

	public updateTrades(trades: Trade<H>[]): void {
		this.settlementPrice = trades[trades.length - 1].price;
	}

	public getSettlementPrice(): H {
		return this.settlementPrice;
	}

	public capture(): DefaultPricing.Snapshot {
		return this.vmctx.DataTypes.hFactory.capture(this.settlementPrice);
	}

	public restore(snapshot: DefaultPricing.Snapshot): void {
		this.settlementPrice = this.vmctx.DataTypes.hFactory.restore(snapshot);
	}
}

export namespace DefaultPricing {
	export type Snapshot = H.Snapshot;
}
