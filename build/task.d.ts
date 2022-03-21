import { Context } from './context';
import { Broadcast } from './broadcast';
import { HLike } from 'interfaces';
export declare abstract class Task<H extends HLike<H>> {
    protected abstract readonly context: Context<H>;
    protected abstract readonly models: Task.ModelDeps<H>;
    protected abstract readonly broadcast: Broadcast<H>;
    protected abstract readonly tasks: Task.TaskDeps<H>;
}
export declare namespace Task {
    interface ModelDeps<H extends HLike<H>> {
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}
