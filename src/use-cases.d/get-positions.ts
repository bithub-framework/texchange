import { Models } from '../models';
import { Context } from '../context';
import { Tasks } from '../tasks';
import { UseCase } from './use-case';
import { Broadcast } from '../broadcast';
import {
	Positions,
	Length,
} from 'interfaces';


export class GetPositions extends UseCase {
	constructor(
		protected context: Context,
		protected models: Models,
		protected broadcast: Broadcast,
		protected tasks: Tasks,
	) {
		super();
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
