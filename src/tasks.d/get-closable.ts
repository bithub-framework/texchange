import {
	Length,
	ConcreteClosable,
	HLike,
} from 'interfaces';
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, GetClosableLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';


export class GetClosable<H extends HLike<H>> extends Task<H>
	implements GetClosableLike<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: StatefulModels<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: TasksLike<H>,
	) { super(); }

	public getClosable(): ConcreteClosable<H> {
		const { assets, makers } = this.models;
		const totalFrozen = makers.getTotalFrozen();
		const position = assets.getPosition();
		return {
			[Length.LONG]: position[Length.LONG]
				.minus(totalFrozen.position[Length.LONG]),
			[Length.SHORT]: position[Length.SHORT]
				.minus(totalFrozen.position[Length.SHORT]),
		};
	}
}
