import { TexchangeTrade, HLike } from 'interfaces';
import { Context } from '../context';
import { Models } from '../models/models';
import { Task } from '../task';
import { Tasks, TradeTakesOpenMakersLike } from '../tasks/tasks';
import { Broadcast } from '../broadcast';
export declare class TradeTakesOpenMakers<H extends HLike<H>> extends Task<H> implements TradeTakesOpenMakersLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: Models<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: Tasks<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>, tasks: Tasks<H>);
    tradeTakesOpenMakers(roTrade: TexchangeTrade<H>): void;
    private tradeShouldTakeOpenOrder;
    private tradeTakesOrderQueue;
    private tradeTakesOpenMaker;
}
