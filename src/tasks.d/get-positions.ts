import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import {
	Positions,
	Length,
} from '../interfaces';
import { ModelLike } from '../models.d/model';
import { initializeStages } from '../initialize-stages';


type OwnInvolved = Pick<Models, 'assets'>;

export class GetPositions {
	private involved: ModelLike[] = [];

	constructor(
		private context: Context,
		private models: OwnInvolved,
		private controllers: Controllers,
	) { }

	public getPositions(): Positions {
		initializeStages(this.involved);
		return {
			position: {
				[Length.LONG]: this.models.assets.position[Length.LONG],
				[Length.SHORT]: this.models.assets.position[Length.SHORT],
			},
			closable: this.controllers.getClosable.getClosable(),
			time: this.context.timeline.now(),
		};
	}
}
