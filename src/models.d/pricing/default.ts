import {
	TexchangeTrades,
	HLike, H,
} from 'interfaces';
import { Pricing } from './pricing';
import { Context } from '../../context';


/**
 * 默认以最新价格作为结算价。
 */
export class DefaultPricing<H extends HLike<H>>
	extends Pricing<H, DefaultPricing.Snapshot> {

	private settlementPrice: H;

	public constructor(
		context: Context<H>,
	) {
		super(context);
		this.settlementPrice = context.config.market.initialSettlementPrice;
	}

	public updateTrades(trades: TexchangeTrades<H>): void {
		this.settlementPrice = trades[trades.length - 1].price;
	}

	public getSettlementPrice(): H {
		return this.settlementPrice;
	}

	public capture(): DefaultPricing.Snapshot {
		return this.context.H.capture(this.settlementPrice);
	}

	public restore(snapshot: DefaultPricing.Snapshot): void {
		this.settlementPrice = this.context.H.restore(snapshot);
	}
}

export namespace DefaultPricing {
	export type Snapshot = H.Snapshot;
}
