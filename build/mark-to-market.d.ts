import { Startable } from 'startable';
import { Context } from './context';
import { Models } from './models';
import { TasksLike } from './tasks-like';
export declare abstract class Mtm {
    abstract startable: Startable;
    protected abstract context: Context;
    protected abstract models: Models;
    protected abstract tasks: TasksLike;
}
