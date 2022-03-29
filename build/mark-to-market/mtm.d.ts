import { Startable } from 'startable';
import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike } from 'interfaces';
export declare abstract class Mtm<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: Mtm.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: Mtm.TaskDeps<H>;
    abstract startable: Startable;
    constructor(context: Context<H>, models: Mtm.ModelDeps<H>, broadcast: Broadcast<H>, tasks: Mtm.TaskDeps<H>);
}
export declare namespace Mtm {
    interface ModelDeps<H extends HLike<H>> {
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}
