import { Context } from '../context';
import { Mtm } from './mtm';
import { Broadcast } from '../broadcast';
import { HLike } from 'secretary-like';
/**
 * 默认永不结算
 */
export declare class DefaultMtm<H extends HLike<H>> extends Mtm<H> {
    constructor(context: Context<H>, models: DefaultMtm.ModelDeps<H>, broadcast: Broadcast<H>, tasks: DefaultMtm.TaskDeps<H>);
    protected rawStart(): Promise<void>;
    protected rawStop(): Promise<void>;
}
export declare namespace DefaultMtm {
    interface ModelDeps<H extends HLike<H>> extends Mtm.ModelDeps<H> {
    }
    const ModelDeps: {};
    interface TaskDeps<H extends HLike<H>> extends Mtm.TaskDeps<H> {
    }
    const TaskDeps: {};
}
