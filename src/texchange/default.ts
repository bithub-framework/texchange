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


export class DefaultTexchange extends Texchange {
	protected readonly context: Context;
	protected readonly mtm: Mtm | null;
	protected readonly models: StatefulModels;
	protected readonly broadcast: Broadcast;
	protected readonly tasks: TasksLike;
	protected readonly useCases: UseCasesLike;
	protected readonly views: Views;
	protected readonly startable: StatefulStartable<Texchange.Snapshot>;

	constructor(
		config: Config,
		timeline: Timeline,
	) {
		super();

		this.context = {
			config,
			timeline,
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
