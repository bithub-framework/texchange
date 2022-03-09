import { Startable } from 'startable';
import { Context } from '../context';
import { ModelsStatic } from '../models/models-static';
import { TasksLike } from '../tasks/tasks-like';
import { Mtm } from './mtm';
/**
 * 默认永不结算
 */
export declare class DefaultMtm extends Mtm {
    protected readonly context: Context;
    protected readonly models: ModelsStatic;
    protected readonly tasks: TasksLike;
    readonly startable: Startable;
    constructor(context: Context, models: ModelsStatic, tasks: TasksLike);
    private start;
    private stop;
}
