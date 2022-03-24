import { Context } from '../context/context';
import { Models } from './models';

import { Makers } from '../models.d/makers/makers';
import { DefaultMakers } from '../models.d/makers/default';
import { Pricing } from '../models.d/pricing/pricing';
import { DefaultPricing } from '../models.d/pricing/default';

import { HLike } from 'interfaces';


export class DefaultModels<H extends HLike<H>>
	extends Models<H> {
	public readonly makers: Makers<H>;
	public readonly pricing: Pricing<H, any>;

	public constructor(
		context: Context<H>,
	) {
		super(context);

		this.makers = new DefaultMakers(context);
		this.pricing = new DefaultPricing(context);
	}
}
