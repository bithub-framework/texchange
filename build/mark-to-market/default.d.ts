import { Context } from '../context';
import { Mtm } from './mtm';
import { Broadcast } from '../broadcast';
import { HLike } from 'interfaces';
/**
 * 默认永不结算
 */
export declare class DefaultMtm<H extends HLike<H>> extends Mtm<H> {
    protected models: DefaultMtm.ModelDeps<H>;
    protected tasks: DefaultMtm.TaskDeps<H>;
    readonly startable: import("startable").StartableLike;
    constructor(context: Context<H>, models: DefaultMtm.ModelDeps<H>, broadcast: Broadcast<H>, tasks: DefaultMtm.TaskDeps<H>);
    private start;
    private stop;
}
export declare namespace DefaultMtm {
    interface ModelDeps<H extends HLike<H>> extends Mtm.ModelDeps<H> {
    }
    interface TaskDeps<H extends HLike<H>> extends Mtm.TaskDeps<H> {
    }
}
