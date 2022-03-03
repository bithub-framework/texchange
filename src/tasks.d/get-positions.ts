import { Models } from '../models';
import { Context } from '../context';
import {
	Positions,
	Length,
} from '../interfaces';
import { Task } from './task';
import { Tasks, GetPositionsLike } from '../tasks';


export class GetPositions extends Task
	implements GetPositionsLike {
	constructor(
		protected context: Context,
		protected models: Models,
		protected tasks: Tasks,
	) {
		super(context, models, tasks);
	}

	public getPositions(): Positions {
		return {
			position: {
				[Length.LONG]: this.models.assets.position[Length.LONG],
				[Length.SHORT]: this.models.assets.position[Length.SHORT],
			},
			closable: this.tasks.getClosable.getClosable(),
			time: this.context.timeline.now(),
		};
	}
}
