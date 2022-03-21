import { Context } from './context';
import { Broadcast } from './broadcast';
import { HLike } from 'interfaces';
export declare abstract class UseCase<H extends HLike<H>> {
    protected abstract readonly context: Context<H>;
    protected abstract readonly models: UseCase.ModelDeps<H>;
    protected abstract readonly broadcast: Broadcast<H>;
    protected abstract readonly tasks: UseCase.TaskDeps<H>;
}
export declare namespace UseCase {
    interface ModelDeps<H extends HLike<H>> {
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}
