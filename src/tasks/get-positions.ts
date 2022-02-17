import { Models } from '../models/models';
import { Context } from '../context/context';
import { Controllers } from '../controllers/controllers';
import {
	LimitOrder,
	OpenOrder,
	Positions,
	Length,
} from '../interfaces';
import { ModelLike } from '../models/model';
import { initializeStages } from './initialize-stages';



export class GetPositions {
	private involved: ModelLike[] = [];

	constructor(
		private context: Context,
		private models: Models,
		private controllers: Controllers,
	) { }

	public getPositions(): Positions {
		initializeStages(this.involved);
		return {
			position: {
				[Length.LONG]: this.models.assets.position[Length.LONG],
				[Length.SHORT]: this.models.assets.position[Length.SHORT],
			},
			closable: this.controllers.accountView.getClosable(),
			time: this.context.timeline.now(),
		};
	}
}
