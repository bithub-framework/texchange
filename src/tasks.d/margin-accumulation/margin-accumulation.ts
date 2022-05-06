import { Context } from '../../context';;
import { Broadcast } from '../../broadcast';
import { MarginAccumulationLike } from './margin-accumulation-like';
import { HLike } from 'secretary-like';


export abstract class MarginAccumulation<H extends HLike<H>>
	implements MarginAccumulationLike<H> {
	protected abstract tasks: MarginAccumulation.TaskDeps<H>;

	public constructor(
		protected context: Context<H>,
		protected models: MarginAccumulation.ModelDeps<H>,
		protected broadcast: Broadcast<H>,
	) { }

	public abstract newMarginAfterOpening(
		volumes: MarginAccumulationLike.Volumes<H>,
	): H;
	public abstract newMarginAfterClosing(
		volumes: MarginAccumulationLike.Volumes<H>,
	): H;
}

export namespace MarginAccumulation {
	export type Volumes<H extends HLike<H>>
		= MarginAccumulationLike.Volumes<H>;

	export interface ModelDeps<H extends HLike<H>> { }
	export interface TaskDeps<H extends HLike<H>> { }
}
