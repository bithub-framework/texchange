import { Tasks } from './tasks';
import { Context } from '../context/context';
import { Broadcast } from '../broadcast';
import { Models } from '../models/models';
import { GetAvailableLike } from '../tasks.d/get-available/get-available-like';
import { SettleLike } from '../tasks.d/settle/settle-like';
import { MarginAccumulationLike } from '../tasks.d/margin-accumulation/margin-accumulation-like';
import { HLike } from 'interfaces';
export declare class DefaultTasks<H extends HLike<H>> extends Tasks<H> {
    readonly getAvailable: GetAvailableLike<H>;
    readonly settle: SettleLike;
    readonly marginAccumulation: MarginAccumulationLike<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>);
}
