import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import {
	Balances,
} from '../interfaces';
import { ModelLike } from '../models.d/model';
import { initializeStages } from '../initialize-stages';


type OwnInvolved = Pick<Models, never>;

export class GetBalances {
	private involved: ModelLike[] = [];

	constructor(
		private context: Context,
		private models: OwnInvolved,
		private controllers: Controllers,
	) { }

	public getBalances(): Balances {
		initializeStages(this.involved);
		return this.controllers.getBalances.getBalances();
	}
}
