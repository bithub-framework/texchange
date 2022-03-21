import { Context } from './context';
import { Broadcast } from './broadcast';
import { HLike } from 'interfaces';


export abstract class UseCase<H extends HLike<H>> {
	protected abstract readonly context: Context<H>;
	protected abstract readonly models: UseCase.ModelDeps<H>;
	protected abstract readonly broadcast: Broadcast<H>;
	protected abstract readonly tasks: UseCase.TaskDeps<H>;
}

export namespace UseCase {
	export interface ModelDeps<H extends HLike<H>> { }
	export interface TaskDeps<H extends HLike<H>> { }
}
