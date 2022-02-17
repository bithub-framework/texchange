import { Models } from '../models/models';
import { Context } from '../context/context';
import { Controllers } from '../controllers/controllers';
import {
	LimitOrder,
	OpenOrder,
	Balances,
} from '../interfaces';
import { ModelLike } from '../models/model';
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
			available: this.controllers.accountView.getAvailable(),
			time: this.context.timeline.now(),
		};
	}
}
