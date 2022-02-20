import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import {
	Balances,
} from '../interfaces';
import { ModelLike } from '../models.d/model';
import { initializeStages } from './initialize-stages';



export class GetBalances {
	private involved: ModelLike[] = [];

	constructor(
		private context: Context,
		private models: Models,
		private controllers: Controllers,
	) { }

	public getBalances(): Balances {
		initializeStages(this.involved);
		return {
			balance: this.models.assets.balance,
			available: this.controllers.getAvailable.getAvailable(),
			time: this.context.timeline.now(),
		};
	}
}
