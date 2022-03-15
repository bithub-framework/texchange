import { Startable } from 'startable';
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { TasksLike } from '../tasks/tasks-like';
import { Mtm } from './mtm';
import { HLike } from 'interfaces';
/**
 * 默认永不结算
 */
export declare class DefaultMtm<H extends HLike<H>> extends Mtm<H> {
    protected readonly context: Context<H>;
    protected readonly models: StatefulModels<H>;
    protected readonly tasks: TasksLike<H>;
    readonly startable: Startable;
    constructor(context: Context<H>, models: StatefulModels<H>, tasks: TasksLike<H>);
    private start;
    private stop;
}
