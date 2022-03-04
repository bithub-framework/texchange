import { Startable } from 'startable';
import { Context } from '../context';
import { Models } from '../models';
import { TasksLike } from '../tasks-like';
import { Mtm } from '../mark-to-market';
/**
 * 默认永不结算
 */
export declare class DefaultMtm extends Mtm {
    protected context: Context;
    protected models: Models;
    protected tasks: TasksLike;
    startable: Startable;
    constructor(context: Context, models: Models, tasks: TasksLike);
    private start;
    private stop;
}
