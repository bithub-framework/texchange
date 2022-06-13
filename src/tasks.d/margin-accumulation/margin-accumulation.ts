import { Context } from '../../context';;
import { Broadcast } from '../../broadcast';
import { MarginAccumulationLike } from './margin-accumulation-like';
import { HLike } from 'secretary-like';
import { instantInject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';


export abstract class MarginAccumulation<H extends HLike<H>>
	implements MarginAccumulationLike<H>
{
	@instantInject(TYPES.Tasks)
	protected tasks!: MarginAccumulation.TaskDeps<H>;
	protected abstract context: Context<H>;
	protected abstract models: MarginAccumulation.ModelDeps<H>;
	protected abstract broadcast: Broadcast<H>;



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
