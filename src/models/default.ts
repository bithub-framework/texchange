import { Context } from '../context';
import { ModelsStatic } from './models-static';
import { Assets } from '../models.d/assets';
import { Margin, DefaultMargin } from '../models.d/margin';
import { Makers, DefaultMakers } from '../models.d/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Pricing, DefaultPricing } from '../models.d/pricing';
import Big from 'big.js';


export class DefaultModels extends ModelsStatic {
	public readonly assets: Assets;
	public readonly margin: Margin;
	public readonly makers: Makers;
	public readonly book: Book;
	public readonly progress: Progress;
	public readonly pricing: Pricing<any>;

	constructor(
		context: Context,
	) {
		super();
		this.assets = new Assets(context);
		this.margin = new DefaultMargin(context);
		this.makers = new DefaultMakers(context);
		this.book = new Book(context);
		this.progress = new Progress(context);
		this.pricing = new DefaultPricing(context, new Big(0));
	}
}
