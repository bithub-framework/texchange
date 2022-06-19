import { Context } from '../../context';;
import { Broadcast } from '../../broadcast';
import { HLike, Length } from 'secretary-like';
import { instantInject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';


export abstract class TaskMarginAccumulation<H extends HLike<H>> {
	@instantInject(TYPES.tasks)
	protected tasks!: TaskMarginAccumulation.TaskDeps<H>;

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
