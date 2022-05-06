import { StartableLike } from 'startable';
import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike } from 'secretary-like';


export abstract class Mtm<H extends HLike<H>> {
    public abstract startable: StartableLike;
    public constructor(
        protected context: Context<H>,
        protected models: Mtm.ModelDeps<H>,
        protected broadcast: Broadcast<H>,
        protected tasks: Mtm.TaskDeps<H>,
    ) { }
}

export namespace Mtm {
    export interface ModelDeps<H extends HLike<H>> { }
    export interface TaskDeps<H extends HLike<H>> { }
}
