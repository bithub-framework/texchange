import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	HLike,
	OpenOrder,
} from 'secretary-like';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { Makers } from '../models.d/makers/makers';


export class GetOpenOrders<H extends HLike<H>> {

	public constructor(
		@inject(TYPES.Context)
		protected context: Context<H>,
		@inject(TYPES.Models)
		protected models: GetOpenOrders.ModelDeps<H>,
		@inject(TYPES.Broadcast)
		protected broadcast: Broadcast<H>,
		@inject(TYPES.Tasks)
		protected tasks: GetOpenOrders.TaskDeps<H>,
	) { }

	public getOpenOrders(): OpenOrder<H>[] {
		return [...this.models.makers];
	}
}

export namespace GetOpenOrders {
	export interface ModelDeps<H extends HLike<H>> {
		makers: Makers<H>;
	}

	export interface TaskDeps<H extends HLike<H>> { }
}
