import { StatefulStartable } from 'startable';
import { Context } from '../context';
import { Mtm } from '../mark-to-market';
import { StatefulModels } from '../models/stateful-models';
import { Broadcast } from '../broadcast';
import { TasksLike } from '../tasks/tasks-like';
import { UseCasesLike } from '../use-cases';
import { Views } from '../views';



export abstract class Texchange {
	protected readonly abstract context: Context;
	protected readonly abstract mtm: Mtm | null;
	protected readonly abstract models: StatefulModels;
	protected readonly abstract broadcast: Broadcast;
	protected readonly abstract tasks: TasksLike;
	protected readonly abstract useCases: UseCasesLike;
	protected readonly abstract views: Views;
	protected readonly abstract startable: StatefulStartable<Snapshot>;
}

export namespace Texchange {
	export type Snapshot = StatefulModels.Snapshot;
}
import Snapshot = Texchange.Snapshot;
