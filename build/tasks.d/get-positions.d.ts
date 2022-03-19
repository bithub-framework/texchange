import { Models } from '../models/models';
import { Context } from '../context';
import { Positions, HLike } from 'interfaces';
import { Task } from '../task';
import { Tasks, GetPositionsLike } from '../tasks/tasks';
import { Broadcast } from '../broadcast';
export declare class GetPositions<H extends HLike<H>> extends Task<H> implements GetPositionsLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: Models<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: Tasks<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>, tasks: Tasks<H>);
    getPositions(): Positions<H>;
}
