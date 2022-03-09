import { StatefulLike } from 'startable';
import { Assets } from '../models.d/assets';
import { Margin } from '../models.d/margin';
import { Makers } from '../models.d/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing';
import { ReadonlyRecur } from 'interfaces';


export abstract class ModelsStatic implements StatefulLike<Snapshot> {
	public abstract readonly assets: Assets;
	public abstract readonly margin: Margin;
	public abstract readonly makers: Makers;
	public abstract readonly book: Book;
	public abstract readonly progress: Progress;
	public abstract readonly pricing: Pricing<any>;

	public capture(): Snapshot {
		return {
			assets: this.assets.capture(),
			margin: this.margin.capture(),
			makers: this.makers.capture(),
			book: this.book.capture(),
			pricing: this.pricing.capture(),
			progress: this.progress.capture(),
		}
	}

	public restore(snapshot: Snapshot): void {
		this.assets.restore(snapshot.assets);
		this.margin.restore(snapshot.margin);
		this.makers.restore(snapshot.makers);
		this.book.restore(snapshot.book);
		this.pricing.restore(snapshot.pricing);
		this.progress.restore(snapshot.progress);
	}
}


export interface SnapshotStruct {
	assets: any;
	margin: any;
	makers: any;
	book: any;
	pricing: any;
	progress: any;
}
export namespace ModelsStatic {
	export type Snapshot = ReadonlyRecur<SnapshotStruct>;
}
import Snapshot = ModelsStatic.Snapshot;
