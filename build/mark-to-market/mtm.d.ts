import { StartableLike } from 'startable';
import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike } from 'secretary-like';
export declare abstract class Mtm<H extends HLike<H>> implements StartableLike {
    protected context: Context<H>;
    protected models: Mtm.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: Mtm.TaskDeps<H>;
    protected abstract rawStart(): Promise<void>;
    protected abstract rawStop(): Promise<void>;
    private startable;
    start: (onStopping?: import("startable").OnStopping | undefined) => Promise<void>;
    stop: (err?: Error | undefined) => Promise<void>;
    assart: (onStopping?: import("startable").OnStopping | undefined) => Promise<void>;
    starp: (err?: Error | undefined) => Promise<void>;
    getReadyState: () => import("startable").ReadyState;
    skipStart: (onStopping?: import("startable").OnStopping | undefined) => void;
    constructor(context: Context<H>, models: Mtm.ModelDeps<H>, broadcast: Broadcast<H>, tasks: Mtm.TaskDeps<H>);
}
export declare namespace Mtm {
    interface ModelDeps<H extends HLike<H>> {
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}
