import { GetAvailableLike } from './get-available-like';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { HLike } from 'secretary-like';
import { instantInject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';

import { Assets } from '../../models.d/assets';


export abstract class GetAvailable<H extends HLike<H>>
	implements GetAvailableLike<H> {
	@instantInject(TYPES.Tasks)
	protected tasks!: GetAvailable.TaskDeps<H>;
	protected abstract context: Context<H>;
	protected abstract models: GetAvailable.ModelDeps<H>;
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


export namespace GetAvailable {
	export interface ModelDeps<H extends HLike<H>> {
		assets: Assets<H>;
	}

	export interface TaskDeps<H extends HLike<H>> { }
}
