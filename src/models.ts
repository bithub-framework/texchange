import { Assets } from './models.d/assets';
import { Margins } from './models.d/margins';
import { Makers } from './models.d/makers/makers';
import { Book } from './models.d/book';
import { Progress } from './models.d/progress';
import { Pricing } from './models.d/pricing/pricing';
import { HLike } from 'interfaces';
import { Context } from './context';
import { instantInject, inject } from 'injektor';



export class Models<
	H extends HLike<H>,
	PricingSnapshot,
	> {
	public assets: Assets<H>;
	public margins: Margins<H>;
	@instantInject(Makers)
	public makers!: Makers<H>;
	public book: Book<H>;
	public progress: Progress<H>;
	@instantInject(Pricing)
	public pricing!: Pricing<H, PricingSnapshot>;

	public constructor(
		@inject(Context)
		context: Context<H>,
	) {
		this.assets = new Assets(context);
		this.margins = new Margins(context);
		this.book = new Book(context);
		this.progress = new Progress(context);
	}
}
