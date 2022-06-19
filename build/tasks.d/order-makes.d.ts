import { HLike, OpenOrder } from 'secretary-like';
import { Context } from '../context';
import { Book } from '../models.d/book';
import { Makers } from '../models.d/makers/makers';
export declare class TaskOrderMakes<H extends HLike<H>> {
    private context;
    private models;
    private tasks;
    constructor(context: Context<H>, models: TaskOrderMakes.ModelDeps<H>);
    orderMakes(order: OpenOrder<H>): void;
}
export declare namespace TaskOrderMakes {
    interface ModelDeps<H extends HLike<H>> {
        book: Book<H>;
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}
