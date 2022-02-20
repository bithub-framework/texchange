import {
	Length,
	Closable,
} from '../interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';
import { ControllerLike } from './controller';



type OwnInvolved = Pick<Models, 'assets' | 'makers'>;
export namespace GetClosable {
	export type Involved = OwnInvolved;
}

export class GetClosable implements ControllerLike {
	public involved: ModelLike[] = [
		this.models.assets,
		this.models.makers,
	];

	constructor(
		protected context: Context,
		protected models: OwnInvolved,
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
