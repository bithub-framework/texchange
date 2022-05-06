import { Tasks } from './tasks';
import { Context } from '../context';
import { Models } from '../models';
import { Broadcast } from '../broadcast';
import { GetAvailableLike } from '../tasks.d/get-available/get-available-like';
import { MarginAccumulationLike } from '../tasks.d/margin-accumulation/margin-accumulation-like';
import { SettleLike } from '../tasks.d/settle/settle-like';
import { DefaultGetAvailable } from '../tasks.d/get-available/default';
import { DefaultMarginAccumulation } from '../tasks.d/margin-accumulation/default';
import { DefaultSettle } from '../tasks.d/settle/default';
import { HLike } from 'secretary-like';
export declare class DefaultTasks<H extends HLike<H>> extends Tasks<H> implements DefaultGetAvailable.TaskDeps<H>, DefaultSettle.TaskDeps<H>, DefaultMarginAccumulation.TaskDeps<H> {
    getAvailable: GetAvailableLike<H>;
    settle: SettleLike;
    marginAccumulation: MarginAccumulationLike<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>);
}
