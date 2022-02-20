import {
	Length,
	Closable,
} from '../interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';
import assert = require('assert');



export namespace GetClosable {
	export type Involved = Pick<Models, 'assets' | 'makers'>;
}
import Involved = GetClosable.Involved;

export class GetClosable {
	public involved: ModelLike[] = [
		this.models.assets,
		this.models.makers,
	];

	constructor(
		protected context: Context,
		protected models: Involved,
	) { }

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
