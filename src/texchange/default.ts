import { Texchange } from './texchange';

import { Config } from '../context.d/config';
import { Timeline } from 'interfaces';
import { HLike, HStatic } from 'interfaces';

import { Context } from '../context/context';
import { DefaultContext } from '../context/default';

import { Mtm } from '../mark-to-market/mtm';
import { DefaultMtm } from '../mark-to-market/default';

import { Models } from '../models/models';
import { DefaultModels } from '../models/default';

import { Tasks } from '../tasks/tasks';
import { DefaultTasks } from '../tasks/default';

import { UseCases } from '../use-cases/use-cases';
import { DefaultUseCases } from '../use-cases/default';

import { Views } from '../views';
import { Latency } from '../views.d/latency';
import { Joystick } from '../views.d/joystick';



export class DefaultTexchange<H extends HLike<H>>
	extends Texchange<H> {
	protected readonly context: Context<H>;
	protected readonly mtm: Mtm<H> | null;
	protected readonly models: Models<H>;
	protected readonly tasks: Tasks<H>;
	protected readonly useCases: UseCases<H>;
	protected readonly views: Views<H>;
	public joystick: Joystick<H>;
	public latency: Latency<H>;

	public constructor(
		config: Config<H>,
		timeline: Timeline,
		H: HStatic<H>,
	) {
		super();
		this.context = new DefaultContext(config, timeline, H);
		this.models = new DefaultModels(this.context);
		this.tasks = new DefaultTasks(this.context, this.models, this.broadcast);
		this.mtm = new DefaultMtm(this.context, this.models, this.tasks);
		this.useCases = new DefaultUseCases(this.context, this.models, this.broadcast, this.tasks);
		this.views = new Views(this.context, this.useCases);
		this.latency = this.views.latency;
		this.joystick = this.views.joystick;
	}
}

export namespace DefaultTexchange {
	export type Snapshot = Texchange.Snapshot;
}
