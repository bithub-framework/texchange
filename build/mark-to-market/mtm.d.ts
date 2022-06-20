import { StartableLike } from 'startable';
import { HLike } from 'secretary-like';
export declare abstract class Mtm<H extends HLike<H>> implements StartableLike {
    protected abstract rawStart(): Promise<void>;
    protected abstract rawStop(): Promise<void>;
    private startable;
    start: (onStopping?: import("startable").OnStopping | undefined) => Promise<void>;
    stop: (err?: Error | undefined) => Promise<void>;
    assart: (onStopping?: import("startable").OnStopping | undefined) => Promise<void>;
    starp: (err?: Error | undefined) => Promise<void>;
    getReadyState: () => import("startable").ReadyState;
    skipStart: (onStopping?: import("startable").OnStopping | undefined) => void;
}
export declare namespace Mtm {
    interface ModelDeps<H extends HLike<H>> {
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}
