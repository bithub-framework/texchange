import { Mtm } from './mtm';
import { HLike } from 'secretary-like';
export declare class DefaultMtm<H extends HLike<H>> extends Mtm<H> {
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
