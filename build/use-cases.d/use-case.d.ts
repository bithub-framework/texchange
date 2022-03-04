import { Models } from '../models';
import { TasksLike } from '../tasks-like';
import { Context } from '../context';
export declare abstract class UseCase {
    protected abstract context: Context;
    protected abstract models: Models;
    protected abstract tasks: TasksLike;
}
