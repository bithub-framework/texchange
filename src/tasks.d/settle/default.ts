import {
	Length,
	HLike,
} from 'interfaces';
import { Context } from '../../context';
import assert = require('assert');
import { Broadcast } from '../../broadcast';
import { Settle } from './settle';


export class DefaultSettle<H extends HLike<H>> extends Settle<H> {
	public constructor(
		protected readonly context: Context<H>,
		protected readonly models: DefaultSettle.ModelDeps<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: DefaultSettle.TaskDeps<H>,
	) { super(); }

	protected clearingMargin(
		length: Length, profit: H,
	): H {
		// 默认逐仓
		return this.models.margins.getMargin()[length]
			.plus(profit);
	}

	protected assertEnoughBalance(): void {
		// 默认逐仓
		for (const length of [Length.SHORT, Length.LONG])
			assert(this.models.margins.getMargin()[length].gte(0));
	}
}

export namespace DefaultSettle {
	export interface ModelDeps<H extends HLike<H>>
		extends Settle.ModelDeps<H> { }

	export interface TaskDeps<H extends HLike<H>>
		extends Settle.TaskDeps<H> { }
}
