import { Closable, HLike } from 'secretary-like';
import { Assets } from '../models.d/assets';
import { Makers } from '../models.d/makers/makers';
export declare class TaskGetClosable<H extends HLike<H>> {
    private models;
    private tasks;
    constructor(models: TaskGetClosable.ModelDeps<H>);
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
