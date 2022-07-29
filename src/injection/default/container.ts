import { Container as BaseContainer } from '../container';
import { TYPES } from './types';
import {
	HLike,
	TimelineLike,
	MarketSpecLike,
	AccountSpecLike,
} from 'secretary-like';
import { DataTypesNamespace } from '../../context/data-types-namespace';

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
import { Config as DelayConfig } from '../../facades.d/config';


export class Container<H extends HLike<H>> extends BaseContainer<H> {
	public [TYPES.DataTypes]: () => DataTypesNamespace<H>;
	public [TYPES.marketSpec] = this.rcs<MarketSpecLike<H>>(DefaultMarketSpec);
	public [TYPES.accountSpec] = this.rcs<AccountSpecLike>(DefaultAccountSpec);
	public [TYPES.timeline]: () => TimelineLike;


	public [TYPES.MODELS.initialBalance]: () => H;
	public [TYPES.MODELS.makers] = this.rcs<Makers<H>>(DefaultMakers);
	public [TYPES.MODELS.pricing] = this.rcs<Pricing<H, any>>(DefaultPricing);
	public [TYPES.MODELS.marginAssets] = this.rcs<MarginAssets<H>>(DefaultMarginAssets);

	public [TYPES.MIDDLEWARES.availableAssetsCalculator] = this.rcs<AvailableAssetsCalculator<H>>(DefaultAvailableAssetsCalculator);

	public [TYPES.mtm] = this.rv<Mtm<H> | null>(null);

	public [TYPES.FACADES.config] = this.rv<DelayConfig>({
		ping: 20,
		processing: 20,
	});

	public constructor(
		timeline: TimelineLike,
		dataTypes: DataTypesNamespace<H>,
		initialBalance: H,
		initialSettlementPrice: H,
	) {
		super();

		this[TYPES.timeline] = this.rv(timeline);
		this[TYPES.DataTypes] = this.rv(dataTypes);
		this[TYPES.MODELS.initialBalance] = this.rv(initialBalance);
		this[TYPES.initialSettlementPrice] = this.rv(initialSettlementPrice);
	}
}
