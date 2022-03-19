import { Models } from '../models/models';
import { Context } from '../context';
import {
	Positions,
	HLike,
	Length,
} from 'interfaces';
import { Task } from '../task';
import { Tasks, GetPositionsLike } from '../tasks/tasks';
import { Broadcast } from '../broadcast';


export class GetPositions<H extends HLike<H>> extends Task<H>
	implements GetPositionsLike<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: Models<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: Tasks<H>,
	) { super(); }

	public getPositions(): Positions<H> {
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
