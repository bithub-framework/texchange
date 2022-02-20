import { Models } from '../models';
import { Context } from '../context';
import {
	Balances,
} from '../interfaces';
import { ModelLike } from '../models.d/model';
import { initializeStages } from '../initialize-stages';
import { GetAvailable } from './get-available';
import { ControllerLike } from './controller';


type OwnInvolved = Pick<Models, 'assets'>;
export namespace GetBalances {
	export type Involved = OwnInvolved
		& GetAvailable.Involved;
}

export class GetBalances implements ControllerLike {
	public involved: ModelLike[] = [
		...this.getAvailable.involved,
	];

	constructor(
		private context: Context,
		private models: OwnInvolved,
		private getAvailable: GetAvailable,
	) { }

	public getBalances(): Balances {
		initializeStages(this.involved);
		return {
			balance: this.models.assets.balance,
			available: this.getAvailable.getAvailable(),
			time: this.context.timeline.now(),
		};
	}
}
