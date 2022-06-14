import { Closable, HLike } from 'secretary-like';
import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { Assets } from '../models.d/assets';
import { Makers } from '../models.d/makers/makers';
export declare class TaskGetClosable<H extends HLike<H>> {
    private context;
    private models;
    private broadcast;
    private tasks;
    constructor(context: Context<H>, models: TaskGetClosable.ModelDeps<H>, broadcast: Broadcast<H>);
    getClosable(): Closable<H>;
}
export declare namespace TaskGetClosable {
    interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}
