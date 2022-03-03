import { StatefulLike } from 'startable';
import { Stringified } from './models.d/model';
import { Timeline } from 'interfaces';
import { Context } from './context';
import { Models } from './models';
import { UseCases } from './use-cases';
import { Mtm } from './mark-to-market';

import { Instant } from './views.d/instant';
import { Latency } from './views.d/latency';
import { Joystick } from './views.d/joystick';


export abstract class Texchange implements StatefulLike<Snapshot, Backup> {
	protected abstract context: Context;
	protected abstract models: Models;
	protected abstract tasks: UseCases;
	protected abstract views: Views;
	protected abstract mtm: Mtm | null;

	constructor(
		timeline: Timeline,
	) {
		// this.models = {
		// 	assets: new Assets(this.context),
		// 	margin: new Margin(this.context),
		// 	makers: new Makers(this.context),
		// 	book: new Book(this.context),
		// 	progress: new Progress(this.context),
		// 	pricing: new DefaultPricing(this.context),
		// }
		// this.scheduler = new Scheduler(this.context, this.models);
	}

	public capture(): Snapshot {
	}

	public restore(backup: Backup): void {
	}
}

type Snapshot = any;
type Backup = Stringified<Snapshot>;


interface Views {
	instant: Instant;
	latency: Latency;
	joystick: Joystick;
}
