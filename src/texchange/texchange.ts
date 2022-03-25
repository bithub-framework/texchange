import { Context } from '../context/context';
import { HLike, HStatic } from 'interfaces';

import { StatefulStartable } from 'startable';
import { Mtm } from '../mark-to-market/mtm';
import { Models } from '../models/models';
import { Broadcast } from '../broadcast';
import { EventEmitter } from 'events';
import { Tasks } from '../tasks/tasks';
import { UseCases } from '../use-cases/use-cases';
import { Views } from '../views';
import { Latency } from '../views.d/latency';
import { Joystick } from '../views.d/joystick';


export abstract class Texchange<H extends HLike<H>> {
	protected abstract context: Context<H>;
	protected abstract mtm: Mtm<H> | null;
	protected abstract models: Models<H>;
	protected broadcast: Broadcast<H>;
	protected abstract tasks: Tasks<H>;
	protected abstract useCases: UseCases<H>;
	protected abstract views: Views<H>;

	public startable: StatefulStartable<Texchange.Snapshot>;
	public abstract latency: Latency<H>;
	public abstract joystick: Joystick<H>;

	public constructor() {
		this.broadcast = <Broadcast<H>>new EventEmitter();
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
