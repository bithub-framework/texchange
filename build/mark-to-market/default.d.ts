import { Startable } from 'startable';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { Tasks } from '../tasks/tasks';
import { Mtm } from './mtm';
import { HLike } from 'interfaces';
/**
 * 默认永不结算
 */
export declare class DefaultMtm<H extends HLike<H>> extends Mtm<H> {
    protected readonly context: Context<H>;
    protected readonly models: Models<H>;
    protected readonly tasks: Tasks<H>;
    readonly startable: Startable;
    constructor(context: Context<H>, models: Models<H>, tasks: Tasks<H>);
    private start;
    private stop;
}
export declare namespace DefaultMtm {
    interface ModelDeps<H extends HLike<H>> extends Mtm.ModelDeps<H> {
    }
    interface TaskDeps<H extends HLike<H>> extends Mtm.TaskDeps<H> {
    }
}
