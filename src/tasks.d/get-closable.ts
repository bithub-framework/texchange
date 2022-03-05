import {
	Length,
	Closable,
} from 'interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { TasksLike, GetClosableLike } from '../tasks-like';
import { Broadcast } from '../broadcast';


export class GetClosable extends Task
	implements GetClosableLike {
	constructor(
		protected readonly context: Context,
		protected readonly models: Models,
		protected readonly broadcast: Broadcast,
		protected readonly tasks: TasksLike,
	) { super(); }

	public getClosable(): Closable {
		const { assets, makers } = this.models;
		return {
			[Length.LONG]: assets.position[Length.LONG]
				.minus(makers.totalFrozen.position[Length.LONG]),
			[Length.SHORT]: assets.position[Length.SHORT]
				.minus(makers.totalFrozen.position[Length.SHORT]),
		};
	}
}
