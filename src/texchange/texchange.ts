import { StatefulStartable } from 'startable';
import { Context } from '../context';
import { Mtm } from '../mark-to-market';
import { StatefulModels } from '../models/stateful-models';
import { Broadcast } from '../broadcast';
import { TasksLike } from '../tasks/tasks-like';
import { UseCasesLike } from '../use-cases';
import { Views } from '../views';
import { HLike } from 'interfaces';


export abstract class Texchange<H extends HLike<H>> {
	protected readonly abstract context: Context<H>;
	protected readonly abstract mtm: Mtm<H> | null;
	protected readonly abstract models: StatefulModels<H>;
	protected readonly abstract broadcast: Broadcast<H>;
	protected readonly abstract tasks: TasksLike<H>;
	protected readonly abstract useCases: UseCasesLike<H>;
	protected readonly abstract views: Views<H>;
	protected readonly abstract startable: StatefulStartable<Texchange.Snapshot>;
}

export namespace Texchange {
	export type Snapshot = StatefulModels.Snapshot;
}
