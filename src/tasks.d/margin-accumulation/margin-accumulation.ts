import { Context } from '../../context';;
import { Broadcast } from '../../broadcast';
import { MarginAccumulationLike } from './margin-accumulation-like';
import { HLike } from 'interfaces';


export abstract class MarginAccumulation<H extends HLike<H>>
	implements MarginAccumulationLike<H> {

	protected abstract readonly context: Context<H>;
	protected abstract readonly models: MarginAccumulation.ModelDeps<H>;
	protected abstract readonly broadcast: Broadcast<H>;
	protected abstract readonly tasks: MarginAccumulation.TaskDeps<H>;

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
