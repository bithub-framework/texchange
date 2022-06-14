import { HLike, OpenOrder, Trade } from 'secretary-like';
import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { Margins } from '../models.d/margins';
import { Assets } from '../models.d/assets';
import { Progress } from '../models.d/progress';
import { Book } from '../models.d/book';
import { TaskOrderVolumes } from './order-volumes';
export declare class TaskOrderTakes<H extends HLike<H>> {
    private context;
    private models;
    private broadcast;
    private tasks;
    constructor(context: Context<H>, models: TaskOrderTakes.ModelDeps<H>, broadcast: Broadcast<H>);
    $orderTakes($taker: OpenOrder<H>): Trade<H>[];
}
export declare namespace TaskOrderTakes {
    interface ModelDeps<H extends HLike<H>> {
        margins: Margins<H>;
        assets: Assets<H>;
        progress: Progress<H>;
        book: Book<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
        orderVolumes: TaskOrderVolumes<H>;
    }
}
