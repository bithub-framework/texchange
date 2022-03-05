import { Models } from '../models';
import { TasksLike } from '../tasks-like';
import { Context } from '../context';
export declare abstract class UseCase {
    protected abstract readonly context: Context;
    protected abstract readonly models: Models;
    protected abstract readonly tasks: TasksLike;
}
