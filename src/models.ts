import { Assets } from './models.d/assets';
import { Margins } from './models.d/margins';
import { Makers } from './models.d/makers/makers';
import { Book } from './models.d/book';
import { Progress } from './models.d/progress';
import { Pricing } from './models.d/pricing/pricing';
import { HLike } from 'interfaces';
import { Context } from './context';
import { inject } from 'injektor';



export class Models<
	H extends HLike<H>,
	PricingSnapshot,
	> {
	public assets: Assets<H>;
	public margins: Margins<H>;
	public book: Book<H>;
	public progress: Progress<H>;

	public constructor(
		@inject(Context)
		context: Context<H>,
		@inject(Makers)
		public makers: Makers<H>,
		@inject(Pricing)
		public pricing: Pricing<H, PricingSnapshot>,
	) {
		this.assets = new Assets(context);
		this.margins = new Margins(context);
		this.book = new Book(context);
		this.progress = new Progress(context);
	}
}

export interface Snapshot<PricingSnapshot> {
	assets: Assets.Snapshot;
	margins: Margins.Snapshot;
	makers: Makers.Snapshot;
	book: Book.Snapshot;
	pricing: PricingSnapshot;
	progress: Progress.Snapshot;
}
