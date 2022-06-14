import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { HLike } from 'secretary-like';
import { instantInject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';

import { Assets } from '../../models.d/assets';


export abstract class TaskGetAvailable<H extends HLike<H>> {
	@instantInject(TYPES.Tasks)
	protected tasks!: TaskGetAvailable.TaskDeps<H>;
	protected abstract context: Context<H>;
	protected abstract models: TaskGetAvailable.ModelDeps<H>;
	protected abstract broadcast: Broadcast<H>;


	public getAvailable(): H {
		return this.models.assets.getBalance()
			.minus(this.finalMargin())
			.minus(this.finalFrozenBalance())
			.round(this.context.spec.market.CURRENCY_DP);
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
