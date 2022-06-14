import {
	Length,
	HLike,
} from 'secretary-like';
import { Context } from '../../context';
import assert = require('assert');
import { Broadcast } from '../../broadcast';
import { TaskSettle } from './settle';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/default/types';


/**
* 默认逐仓
*/
export class DefaultTaskSettle<H extends HLike<H>>
	extends TaskSettle<H> {

	public constructor(
		@inject(TYPES.Context)
		protected context: Context<H>,
		@inject(TYPES.Models)
		protected models: DefaultTaskSettle.ModelDeps<H>,
		@inject(TYPES.Broadcast)
		protected broadcast: Broadcast<H>,
	) {
		super();
	}


	protected clearingMargin(
		length: Length, profit: H,
	): H {

		return this.models.margins.getMargin()[length]
			.plus(profit);
	}

	protected assertEnoughBalance(): void {
		for (const length of [Length.SHORT, Length.LONG])
			assert(this.models.margins.getMargin()[length].gte(0));
	}
}

export namespace DefaultTaskSettle {
	export interface ModelDeps<H extends HLike<H>>
		extends TaskSettle.ModelDeps<H> { }

	export interface TaskDeps<H extends HLike<H>>
		extends TaskSettle.TaskDeps<H> { }
}
