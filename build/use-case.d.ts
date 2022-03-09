import { ModelsStatic } from './models/models-static';
import { TasksLike } from './tasks/tasks-like';
import { Context } from './context';
export declare abstract class UseCase {
    protected abstract readonly context: Context;
    protected abstract readonly models: ModelsStatic;
    protected abstract readonly tasks: TasksLike;
}
