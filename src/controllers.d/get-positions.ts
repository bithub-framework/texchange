import { Models } from '../models';
import { Context } from '../context';
import {
	Positions,
	Length,
} from '../interfaces';
import { ModelLike } from '../models.d/model';
import { initializeStages } from '../initialize-stages';
import { GetClosable } from './get-closable';
import { ControllerLike } from './controller';



type OwnInvolved = Pick<Models, 'assets'>;
export namespace GetPositions {
	export type Involved = OwnInvolved
		& GetClosable.Involved;
}

export class GetPositions implements ControllerLike {
	public involved: ModelLike[] = [
		...this.getClosable.involved,
	];

	constructor(
		private context: Context,
		private models: OwnInvolved,
		private getClosable: GetClosable,
	) { }

	public getPositions(): Positions {
		initializeStages(this.involved);
		return {
			position: {
				[Length.LONG]: this.models.assets.position[Length.LONG],
				[Length.SHORT]: this.models.assets.position[Length.SHORT],
			},
			closable: this.getClosable.getClosable(),
			time: this.context.timeline.now(),
		};
	}
}
