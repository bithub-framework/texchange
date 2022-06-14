import { HLike, Trade } from 'secretary-like';
import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { Makers } from '../models.d/makers/makers';
import { Margins } from '../models.d/margins';
import { Assets } from '../models.d/assets';
import { TaskOrderVolumes } from './order-volumes';
export declare class TaskTradeTakesOpenMakers<H extends HLike<H>> {
    private context;
    private models;
    private broadcast;
    private tasks;
    constructor(context: Context<H>, models: TaskTradeTakesOpenMakers.ModelDeps<H>, broadcast: Broadcast<H>);
    tradeTakesOpenMakers(trade: Trade<H>): void;
    private $tradeShouldTakeOpenOrder;
    private $tradeTakesOrderQueue;
    private tradeTakesOpenMaker;
}
export declare namespace TaskTradeTakesOpenMakers {
    interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
        margins: Margins<H>;
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
        orderVolumes: TaskOrderVolumes<H>;
    }
}
