import { Startable } from 'startable';
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { TasksLike } from '../tasks/tasks-like';
import { HLike } from 'interfaces';


export abstract class Mtm<H extends HLike<H>> {
    public abstract readonly startable: Startable;
    protected abstract readonly context: Context<H>;
    protected abstract readonly models: StatefulModels<H>;
    protected abstract readonly tasks: TasksLike<H>;
}
