import { Context } from '../../context';
import { StatefulModels } from '../../models/stateful-models';
import { Task } from '../../task';
import { TasksLike, GetAvailableLike } from '../../tasks/tasks-like';
import { Broadcast } from '../../broadcast';
import { HLike } from 'interfaces';


export abstract class GetAvailable<H extends HLike<H>>
	extends Task<H>
	implements GetAvailableLike<H> {

	protected abstract readonly context: Context<H>;
	protected abstract readonly models: StatefulModels<H>;
	protected abstract readonly broadcast: Broadcast<H>;
	protected abstract readonly tasks: TasksLike<H>;

	public getAvailable(): H {
		return this.models.assets.getBalance()
			.minus(this.finalMargin())
			.minus(this.finalFrozenBalance())
			.round(this.context.config.market.CURRENCY_DP);
	}

	protected abstract finalMargin(): H;
	protected abstract finalFrozenBalance(): H;
}
