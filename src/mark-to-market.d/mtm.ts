import { Startable } from 'startable';
import { Context } from '../context';
import { Models } from '../models';
import { TasksLike } from '../tasks-like';


export abstract class Mtm {
    public abstract readonly startable: Startable;
    protected abstract readonly context: Context;
    protected abstract readonly models: Models;
    protected abstract readonly tasks: TasksLike;
}
