import { Context } from '../../context';
import { Models } from '../../models/models';
import { Task } from '../../task';
import { Tasks, GetAvailableLike } from '../../tasks/tasks';
import { Broadcast } from '../../broadcast';
import { HLike } from 'interfaces';


export abstract class GetAvailable<H extends HLike<H>>
	extends Task<H>
	implements GetAvailableLike<H> {

	protected abstract readonly context: Context<H>;
	protected abstract readonly models: Models<H>;
	protected abstract readonly broadcast: Broadcast<H>;
	protected abstract readonly tasks: Tasks<H>;

	public getAvailable(): H {
		return this.models.assets.getBalance()
			.minus(this.finalMargin())
			.minus(this.finalFrozenBalance())
			.round(this.context.config.market.CURRENCY_DP);
	}

	protected abstract finalMargin(): H;
	protected abstract finalFrozenBalance(): H;
}
