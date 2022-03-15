import { Texchange } from './texchange';
import { StatefulStartable } from 'startable';

import { Context } from '../context';
import { Config } from '../context.d/config';
import { Timeline } from 'interfaces';

import { Mtm, DefaultMtm } from '../mark-to-market';
import { StatefulModels, DefaultModels } from '../models';
import { Broadcast } from '../broadcast';
import { TasksLike, DefaultTasks } from '../tasks';
import { UseCasesLike, DefaultUseCases } from '../use-cases';
import { Views } from '../views';

import { HLike, HStatic } from 'interfaces';


export class DefaultTexchange<H extends HLike<H>>
	extends Texchange<H> {
	protected readonly context: Context<H>;
	protected readonly mtm: Mtm<H> | null;
	protected readonly models: StatefulModels<H>;
	protected readonly broadcast: Broadcast<H>;
	protected readonly tasks: TasksLike<H>;
	protected readonly useCases: UseCasesLike<H>;
	protected readonly views: Views<H>;
	protected readonly startable: StatefulStartable<Texchange.Snapshot>;

	constructor(
		config: Config<H>,
		timeline: Timeline,
		H: HStatic<H>,
	) {
		super();

		this.context = {
			config,
			timeline,
			H,
		}
		this.models = new DefaultModels(this.context);
		this.broadcast = new Broadcast();
		this.tasks = new DefaultTasks(this.context, this.models, this.broadcast);
		this.mtm = new DefaultMtm(this.context, this.models, this.tasks);
		this.useCases = new DefaultUseCases(this.context, this.models, this.broadcast, this.tasks);
		this.views = new Views(this.context, this.useCases);

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

export namespace DefaultTexchange {
	export type Snapshot = Texchange.Snapshot;
}
