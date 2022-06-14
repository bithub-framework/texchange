import { Context } from '../../context';;
import { Broadcast } from '../../broadcast';
import { HLike, Length } from 'secretary-like';
import { instantInject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';


export abstract class TaskMarginAccumulation<H extends HLike<H>> {
	@instantInject(TYPES.Tasks)
	protected tasks!: TaskMarginAccumulation.TaskDeps<H>;
	protected abstract context: Context<H>;
	protected abstract models: TaskMarginAccumulation.ModelDeps<H>;
	protected abstract broadcast: Broadcast<H>;



	public abstract newMarginAfterOpening(
		volumes: TaskMarginAccumulation.Volumes<H>,
	): H;
	public abstract newMarginAfterClosing(
		volumes: TaskMarginAccumulation.Volumes<H>,
	): H;
}

export namespace TaskMarginAccumulation {
	export interface Volumes<H extends HLike<H>> {
		length: Length;
		volume: H;
		dollarVolume: H;
	}

	export interface ModelDeps<H extends HLike<H>> { }
	export interface TaskDeps<H extends HLike<H>> { }
}
