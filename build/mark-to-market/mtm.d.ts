import { HLike } from 'secretary-like';
export declare abstract class Mtm<H extends HLike<H>> {
    protected abstract rawStart(): Promise<void>;
    protected abstract rawStop(): Promise<void>;
    $s: import("startable").Startable;
}
export declare namespace Mtm {
    interface ModelDeps<H extends HLike<H>> {
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}
