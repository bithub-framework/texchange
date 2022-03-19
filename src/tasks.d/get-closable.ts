import {
	Length,
	Closable,
	HLike,
} from 'interfaces';
import { Context } from '../context';
import { Models } from '../models/models';
import { Task } from '../task';
import { Tasks, GetClosableLike } from '../tasks/tasks';
import { Broadcast } from '../broadcast';


export class GetClosable<H extends HLike<H>> extends Task<H>
	implements GetClosableLike<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: Models<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: Tasks<H>,
	) { super(); }

	public getClosable(): Closable<H> {
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
