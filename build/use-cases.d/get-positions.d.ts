import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { Positions, HLike } from 'secretary-like';
import { Assets } from '../models.d/assets';
import { TaskGetClosable } from '../tasks.d/get-closable';
export declare class UseCaseGetPositions<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: UseCaseGetPositions.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: UseCaseGetPositions.TaskDeps<H>;
    constructor(context: Context<H>, models: UseCaseGetPositions.ModelDeps<H>, broadcast: Broadcast<H>, tasks: UseCaseGetPositions.TaskDeps<H>);
    getPositions(): Positions<H>;
}
export declare namespace UseCaseGetPositions {
    interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
        getClosable: TaskGetClosable<H>;
    }
}
