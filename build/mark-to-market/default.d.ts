import { Startable } from 'startable';
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { TasksLike } from '../tasks/tasks-like';
import { Mtm } from './mtm';
/**
 * 默认永不结算
 */
export declare class DefaultMtm extends Mtm {
    protected readonly context: Context;
    protected readonly models: StatefulModels;
    protected readonly tasks: TasksLike;
    readonly startable: Startable;
    constructor(context: Context, models: StatefulModels, tasks: TasksLike);
    private start;
    private stop;
}
