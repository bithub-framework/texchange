import { Context } from '../context';
import { Positions, HLike } from 'secretary-like';
import { Broadcast } from '../broadcast';
import { Assets } from '../models.d/assets';
import { TaskGetClosable } from './get-closable';
export declare class TaskGetPositions<H extends HLike<H>> {
    private context;
    private models;
    private broadcast;
    private tasks;
    constructor(context: Context<H>, models: TaskGetPositions.ModelDeps<H>, broadcast: Broadcast<H>);
    getPositions(): Positions<H>;
}
export declare namespace TaskGetPositions {
    interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
        getClosable: TaskGetClosable<H>;
    }
}
