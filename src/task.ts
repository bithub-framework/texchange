import { Context } from './context';
import { Broadcast } from './broadcast';
import { HLike } from 'interfaces';


export abstract class Task<H extends HLike<H>> {
	protected abstract readonly context: Context<H>;
	protected abstract readonly models: Task.ModelDeps<H>;
	protected abstract readonly broadcast: Broadcast<H>;
	protected abstract readonly tasks: Task.TaskDeps<H>;
}

export namespace Task {
	export interface ModelDeps<H extends HLike<H>> { }
	export interface TaskDeps<H extends HLike<H>> { }
}
