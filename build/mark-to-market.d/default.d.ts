import { Startable } from 'startable';
import { Context } from '../context';
import { Models } from '../models';
import { TasksLike } from '../tasks-like';
import { Mtm } from '../mark-to-market';
/**
 * 默认永不结算
 */
export declare class DefaultMtm extends Mtm {
    protected readonly context: Context;
    protected readonly models: Models;
    protected readonly tasks: TasksLike;
    readonly startable: Startable;
    constructor(context: Context, models: Models, tasks: TasksLike);
    private start;
    private stop;
}
