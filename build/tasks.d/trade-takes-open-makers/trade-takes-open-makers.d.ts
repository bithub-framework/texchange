import { TexchangeTrade, HLike } from 'interfaces';
import { Context } from '../../context';
import { Task } from '../../task';
import { TradeTakesOpenMakersLike } from './trade-takes-open-makers-like';
import { Broadcast } from '../../broadcast';
import { Makers } from '../../models.d/makers';
import { Margins } from '../../models.d/margins';
import { Assets } from '../../models.d/assets';
import { OrderVolumesLike } from '../order-volumes/order-volumes-like';
export declare class TradeTakesOpenMakers<H extends HLike<H>> extends Task<H> implements TradeTakesOpenMakersLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: TradeTakesOpenMakers.ModelDeps<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: TradeTakesOpenMakers.TaskDeps<H>;
    constructor(context: Context<H>, models: TradeTakesOpenMakers.ModelDeps<H>, broadcast: Broadcast<H>, tasks: TradeTakesOpenMakers.TaskDeps<H>);
    tradeTakesOpenMakers(roTrade: TexchangeTrade<H>): void;
    private tradeShouldTakeOpenOrder;
    private tradeTakesOrderQueue;
    private tradeTakesOpenMaker;
}
export declare namespace TradeTakesOpenMakers {
    interface ModelDeps<H extends HLike<H>> extends Task.ModelDeps<H> {
        assets: Assets<H>;
        margins: Margins<H>;
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> extends Task.TaskDeps<H> {
        orderVolumes: OrderVolumesLike<H>;
    }
}
