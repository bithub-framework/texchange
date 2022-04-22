import { Tasks } from './tasks';
import { DefaultGetAvailable } from '../tasks.d/get-available/default';
import { DefaultMarginAccumulation } from '../tasks.d/margin-accumulation/default';
import { DefaultSettle } from '../tasks.d/settle/default';
import { HLike } from 'interfaces';

export class DefaultTasks<H extends HLike<H>>
	extends Tasks<H> implements
	DefaultGetAvailable.TaskDeps<H>,
	DefaultSettle.TaskDeps<H>,
	DefaultMarginAccumulation.TaskDeps<H>
{ }
