import { StatefulLike } from 'startable';
import { EventEmitter } from 'events';
import {
	Timeline,
	TypeRecur,
} from './interfaces';
import { Context } from './context';
import { Models } from './models';
import { Tasks } from './tasks';
import { Broadcast } from './context.d/broadcast';

import { Instant } from './views.d/instant';
import { Latency } from './views.d/latency';
import { Joystick } from './views.d/joystick';
import Big from 'big.js';



type Views = {
	instant: Instant;
	latency: Latency;
	joystick: Joystick;
}

export abstract class Texchange implements StatefulLike<Snapshot, Backup> {
	protected abstract context: Context;
	protected abstract models: Models;
	protected abstract tasks: Tasks;
	protected abstract views: Views;

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
type Backup = TypeRecur<Snapshot, Big, string>;
