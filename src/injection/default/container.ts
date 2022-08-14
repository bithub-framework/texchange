import { Container as BaseContainer } from '../container';
import { TYPES } from './types';
import {
	HLike,
	TimelineLike,
	MarketSpec,
	AccountSpec,
} from 'secretary-like';

// Vmctx
import { VirtualMachineContextLike } from '../../vmctx';

// Spec
import { DefaultMarketSpec } from '../../spec/default-market-spec';
import { DefaultAccountSpec } from '../../spec/default-account-spec';

// Models
import { Makers } from '../../models.d/makers/makers';
import { DefaultMakers } from '../../models.d/makers/default';
import { Pricing } from '../../models.d/pricing/pricing';
import { DefaultPricing } from '../../models.d/pricing/default';
import { MarginAssets } from '../../models.d/margin-assets';
import { DefaultMarginAssets } from '../../models.d/margin-assets/default';

// Middlewares
import { AvailableAssetsCalculator } from '../../middlewares/available-assets-calculator/available-assets-calculator';
import { DefaultAvailableAssetsCalculator } from '../../middlewares/available-assets-calculator/default';

// Mark to market
import { Mtm } from '../../mark-to-market/mtm';
import { DefaultMtm } from '../../mark-to-market/default';

// Facades
import { LatencyConfig as DelayConfig } from '../../facades.d/latency-config';


export class Container<H extends HLike<H>> extends BaseContainer<H> {
	public [TYPES.vmctx]: () => VirtualMachineContextLike<H>;

	public [TYPES.marketSpec] = this.rcs<MarketSpec<H>>(DefaultMarketSpec);
	public [TYPES.accountSpec] = this.rcs<AccountSpec>(DefaultAccountSpec);

	public [TYPES.MODELS.initialBalance]: () => H;
	public [TYPES.MODELS.makers] = this.rcs<Makers<H>>(DefaultMakers);
	public [TYPES.MODELS.pricing] = this.rcs<Pricing<H, any>>(DefaultPricing);
	public [TYPES.MODELS.initialSettlementPrice]: () => H;
	public [TYPES.MODELS.marginAssets] = this.rcs<MarginAssets<H>>(DefaultMarginAssets);

	public [TYPES.MIDDLEWARES.availableAssetsCalculator] = this.rcs<AvailableAssetsCalculator<H>>(DefaultAvailableAssetsCalculator);

	public [TYPES.mtm] = this.rv<Mtm<H> | null>(null);

	public [TYPES.FACADES.config] = this.rv<DelayConfig>({
		ping: 20,
		processing: 20,
	});

	public constructor(
		vmctx: VirtualMachineContextLike<H>,
		initialBalance: H,
		initialSettlementPrice: H,
	) {
		super();
		this[TYPES.vmctx] = this.rv(vmctx);
		this[TYPES.MODELS.initialBalance] = this.rv(initialBalance);
		this[TYPES.MODELS.initialSettlementPrice] = this.rv(initialSettlementPrice);
	}
}
