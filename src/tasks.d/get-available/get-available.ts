import { Task } from '../../task';
import { GetAvailableLike } from './get-available-like';
import { HLike } from 'interfaces';

import { Assets } from '../../models.d/assets';


export abstract class GetAvailable<H extends HLike<H>>
	extends Task<H>
	implements GetAvailableLike<H> {

	protected abstract readonly models: GetAvailable.ModelDeps<H>;
	protected abstract readonly tasks: GetAvailable.TaskDeps<H>;

	public getAvailable(): H {
		return this.models.assets.getBalance()
			.minus(this.finalMargin())
			.minus(this.finalFrozenBalance())
			.round(this.context.config.market.CURRENCY_DP);
	}

	protected abstract finalMargin(): H;
	protected abstract finalFrozenBalance(): H;
}


export namespace GetAvailable {
	export interface ModelDeps<H extends HLike<H>>
		extends Task.ModelDeps<H> {
		assets: Assets<H>;
	}

	export interface TaskDeps<H extends HLike<H>>
		extends Task.TaskDeps<H> { }
}
