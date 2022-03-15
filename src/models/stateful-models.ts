import { StatefulLike } from 'startable';
import { Assets } from '../models.d/assets';
import { Margins } from '../models.d/margins';
import { Makers } from '../models.d/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing';
import {
	HLike,
} from 'interfaces';


export abstract class StatefulModels<H extends HLike<H>>
	implements StatefulLike<StatefulModels.Snapshot> {

	public abstract readonly assets: Assets<H>;
	public abstract readonly margins: Margins<H>;
	public abstract readonly makers: Makers<H>;
	public abstract readonly book: Book<H>;
	public abstract readonly progress: Progress<H>;
	public abstract readonly pricing: Pricing<H, any>;

	public capture(): StatefulModels.Snapshot {
		return {
			assets: this.assets.capture(),
			margins: this.margins.capture(),
			makers: this.makers.capture(),
			book: this.book.capture(),
			pricing: this.pricing.capture(),
			progress: this.progress.capture(),
		}
	}

	public restore(snapshot: StatefulModels.Snapshot): void {
		this.assets.restore(snapshot.assets);
		this.margins.restore(snapshot.margins);
		this.makers.restore(snapshot.makers);
		this.book.restore(snapshot.book);
		this.pricing.restore(snapshot.pricing);
		this.progress.restore(snapshot.progress);
	}
}


export namespace StatefulModels {
	export interface Snapshot {
		readonly assets: any;
		readonly margins: any;
		readonly makers: any;
		readonly book: any;
		readonly pricing: any;
		readonly progress: any;
	}
}
