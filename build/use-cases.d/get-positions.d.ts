import { Positions, HLike } from 'secretary-like';
import { Assets } from '../models.d/assets';
import { TaskGetPositions } from '../tasks.d/get-positions';
export declare class UseCaseGetPositions<H extends HLike<H>> {
    private tasks;
    constructor(tasks: UseCaseGetPositions.TaskDeps<H>);
    getPositions(): Positions<H>;
}
export declare namespace UseCaseGetPositions {
    interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
        getPositions: TaskGetPositions<H>;
    }
}
