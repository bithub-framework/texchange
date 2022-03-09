import { Startable } from 'startable';
import { Context } from '../context';
import { ModelsStatic } from '../models/models-static';
import { TasksLike } from '../tasks/tasks-like';
export declare abstract class Mtm {
    abstract readonly startable: Startable;
    protected abstract readonly context: Context;
    protected abstract readonly models: ModelsStatic;
    protected abstract readonly tasks: TasksLike;
}
