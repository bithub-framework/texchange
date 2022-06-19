import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import {
	HLike,
	MarketSpec,
} from 'secretary-like';
import { instantInject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';

import { Assets } from '../../models.d/assets';


export abstract class TaskGetAvailable<H extends HLike<H>> {
	@instantInject(TYPES.tasks)
	protected tasks!: TaskGetAvailable.TaskDeps<H>;
	protected abstract marketSpec: MarketSpec<H>;
	protected abstract models: TaskGetAvailable.ModelDeps<H>;


	public getAvailable(): H {
		return this.models.assets.getBalance()
			.minus(this.finalMargin())
			.minus(this.finalFrozenBalance())
			.round(this.marketSpec.CURRENCY_DP);
	}

	protected abstract finalMargin(): H;
	protected abstract finalFrozenBalance(): H;
}


export namespace TaskGetAvailable {
	export interface ModelDeps<H extends HLike<H>> {
		assets: Assets<H>;
	}

	export interface TaskDeps<H extends HLike<H>> { }
}
