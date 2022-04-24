import { HLike } from 'interfaces';
import { Startable, StartableLike } from 'startable';
import { StatefulLike } from './stateful-like';
import { inject } from 'injektor';
import { TYPES } from './types';

// Models
import { Assets } from './models.d/assets';
import { Margins } from './models.d/margins';
import { Makers } from './models.d/makers/makers';
import { Book } from './models.d/book';
import { Progress } from './models.d/progress';

import { Models } from './models';

// Mark to market
import { Mtm } from './mark-to-market/mtm';

// Controller
import { Latency } from './facades.d/latency';
import { Joystick } from './facades.d/joystick';


export class Texchange<
	H extends HLike<H>,
	PricingSnapshot,
	> implements StatefulLike<Snapshot<PricingSnapshot>> {

	public startable: StartableLike;

	public constructor(
		@inject(Models)
		protected models: Models<H, PricingSnapshot>,
		@inject(Mtm)
		protected mtm: Mtm<H> | null,
		@inject(TYPES.User)
		public user: Latency<H>,
		@inject(TYPES.Admin)
		public admin: Joystick<H>,
	) {
		this.startable = Startable.create(
			() => this.start(),
			() => this.stop(),
		);
	}

	private async start() {
		if (this.mtm)
			await this.mtm.startable.start(this.startable.stop);
	}

	private async stop() {
		if (this.mtm)
			await this.mtm.startable.stop();
	}

	public capture(): Snapshot<PricingSnapshot> {
		return {
			assets: this.models.assets.capture(),
			margins: this.models.margins.capture(),
			makers: this.models.makers.capture(),
			book: this.models.book.capture(),
			pricing: this.models.pricing.capture(),
			progress: this.models.progress.capture(),
		}
	}

	public restore(snapshot: Snapshot<PricingSnapshot>): void {
		this.models.assets.restore(snapshot.assets);
		this.models.margins.restore(snapshot.margins);
		this.models.makers.restore(snapshot.makers);
		this.models.book.restore(snapshot.book);
		this.models.pricing.restore(snapshot.pricing);
		this.models.progress.restore(snapshot.progress);
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
