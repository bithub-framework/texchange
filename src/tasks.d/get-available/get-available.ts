import { inject } from 'injektor';
import { GetAvailableLike } from './get-available-like';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { HLike } from 'interfaces';

import { Assets } from '../../models.d/assets';


export abstract class GetAvailable<H extends HLike<H>>
	implements GetAvailableLike<H> {
	public static TaskDeps = {};
	@inject(GetAvailable.TaskDeps)
	protected tasks!: GetAvailable.TaskDeps<H>;

	public constructor(
		protected context: Context<H>,
		protected models: GetAvailable.ModelDeps<H>,
		protected broadcast: Broadcast<H>,
	) { }

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
	export interface ModelDeps<H extends HLike<H>> {
		assets: Assets<H>;
	}

	export interface TaskDeps<H extends HLike<H>> { }
}
