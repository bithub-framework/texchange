import { Tasks, GetAvailableLike, SettleLike, MarginAccumulationLike } from './tasks';
import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { Models } from '../models/models';
import { HLike } from 'interfaces';
export declare class DefaultTasks<H extends HLike<H>> extends Tasks<H> {
    readonly getAvailable: GetAvailableLike<H>;
    readonly settle: SettleLike;
    readonly marginAccumulation: MarginAccumulationLike<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>);
}
