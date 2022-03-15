import { Context } from '../context';
import { StatefulModels } from './stateful-models';
import { Assets } from '../models.d/assets';
import { Margins } from '../models.d/margins';
import { Makers, DefaultMakers } from '../models.d/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Pricing, DefaultPricing } from '../models.d/pricing';
import { HLike } from 'interfaces';


export class DefaultModels<H extends HLike<H>>
	extends StatefulModels<H> {
	public readonly assets: Assets<H>;
	public readonly margins: Margins<H>;
	public readonly makers: Makers<H>;
	public readonly book: Book<H>;
	public readonly progress: Progress<H>;
	public readonly pricing: Pricing<H, any>;

	constructor(
		protected readonly context: Context<H>,
	) {
		super();
		this.assets = new Assets(context);
		this.margins = new Margins(context);
		this.makers = new DefaultMakers(context);
		this.book = new Book(context);
		this.progress = new Progress(context);
		this.pricing = new DefaultPricing(context);
	}
}
