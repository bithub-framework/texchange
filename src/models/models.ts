import { StatefulLike } from 'startable';
import { Assets } from '../models.d/assets';
import { Margins } from '../models.d/margins';
import { Makers } from '../models.d/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing';
import { Context } from '../context';
import {
	HLike,
} from 'interfaces';


export abstract class Models<H extends HLike<H>>
	implements StatefulLike<Models.Snapshot> {

	public readonly assets: Assets<H>;
	public readonly margins: Margins<H>;
	public abstract readonly makers: Makers<H>;
	public readonly book: Book<H>;
	public readonly progress: Progress<H>;
	public abstract readonly pricing: Pricing<H, any>;

	public constructor(
		context: Context<H>,
	) {
		this.assets = new Assets(context);
		this.margins = new Margins(context);
		this.book = new Book(context);
		this.progress = new Progress(context);
	}

	public capture(): Models.Snapshot {
		return {
			assets: this.assets.capture(),
			margins: this.margins.capture(),
			makers: this.makers.capture(),
			book: this.book.capture(),
			pricing: this.pricing.capture(),
			progress: this.progress.capture(),
		}
	}

	public restore(snapshot: Models.Snapshot): void {
		this.assets.restore(snapshot.assets);
		this.margins.restore(snapshot.margins);
		this.makers.restore(snapshot.makers);
		this.book.restore(snapshot.book);
		this.pricing.restore(snapshot.pricing);
		this.progress.restore(snapshot.progress);
	}
}


export namespace Models {
	export interface Snapshot {
		readonly assets: any;
		readonly margins: any;
		readonly makers: any;
		readonly book: any;
		readonly pricing: any;
		readonly progress: any;
	}
}
