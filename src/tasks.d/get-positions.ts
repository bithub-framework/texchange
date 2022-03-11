import { StatefulModels } from '../models/stateful-models';
import { Context } from '../context';
import {
	Positions,
	Length,
} from 'interfaces';
import { Task } from '../task';
import { TasksLike, GetPositionsLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';


export class GetPositions extends Task
	implements GetPositionsLike {
	constructor(
		protected readonly context: Context,
		protected readonly models: StatefulModels,
		protected readonly broadcast: Broadcast,
		protected readonly tasks: TasksLike,
	) { super(); }

	public getPositions(): Positions {
		return {
			position: {
				[Length.LONG]: this.models.assets.getPosition()[Length.LONG],
				[Length.SHORT]: this.models.assets.getPosition()[Length.SHORT],
			},
			closable: this.tasks.getClosable.getClosable(),
			time: this.context.timeline.now(),
		};
	}
}
