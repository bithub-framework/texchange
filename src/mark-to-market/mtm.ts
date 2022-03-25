import { Startable } from 'startable';
import { Context } from '../context/context';
import { Broadcast } from '../broadcast';
import { HLike } from 'interfaces';


export abstract class Mtm<H extends HLike<H>> {
    public abstract startable: Startable;
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
