import { Startable } from 'startable';
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { TasksLike } from '../tasks/tasks-like';


export abstract class Mtm {
    public abstract readonly startable: Startable;
    protected abstract readonly context: Context;
    protected abstract readonly models: StatefulModels;
    protected abstract readonly tasks: TasksLike;
}
