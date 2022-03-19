import { Models } from '../models/models';
import { Context } from '../context';
import { Tasks } from '../tasks/tasks';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import {
	Positions,
	Length,
	HLike,
} from 'interfaces';


export class GetPositions<H extends HLike<H>>
	extends UseCase<H> {
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
