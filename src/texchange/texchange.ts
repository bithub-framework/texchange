import { Context } from '../context';
import { Config } from '../context.d/config';
import { Timeline } from 'interfaces';
import { HLike, HStatic } from 'interfaces';

import { StatefulStartable } from 'startable';
import { Mtm } from '../mark-to-market';
import { Models } from '../models/models';
import { Broadcast } from '../broadcast';
import { Tasks } from '../tasks/tasks';
import { UseCases } from '../use-cases';
import { Views } from '../views';
import { Latency } from '../views.d/latency';
import { Joystick } from '../views.d/joystick';


export abstract class Texchange<H extends HLike<H>> {
	protected abstract readonly context: Context<H>;
	protected readonly abstract mtm: Mtm<H> | null;
	protected readonly abstract models: Models<H>;
	protected readonly broadcast: Broadcast<H>;
	protected readonly abstract tasks: Tasks<H>;
	protected readonly abstract useCases: UseCases<H>;
	protected readonly abstract views: Views<H>;

	public readonly startable: StatefulStartable<Texchange.Snapshot>;
	public abstract readonly latency: Latency<H>;
	public abstract readonly joystick: Joystick<H>;

	public constructor() {
		this.broadcast = new Broadcast();
		this.startable = new StatefulStartable(
			() => this.start(),
			() => this.stop(),
			() => this.models.capture(),
			snapshot => this.models.restore(snapshot),
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
}

export namespace Texchange {
	export type Snapshot = Models.Snapshot;
}
