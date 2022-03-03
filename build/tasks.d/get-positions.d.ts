import { Models } from '../models';
import { Context } from '../context';
import { Positions } from 'interfaces';
import { Task } from './task';
import { Tasks, GetPositionsLike } from '../tasks';
import { Broadcast } from '../broadcast';
export declare class GetPositions extends Task implements GetPositionsLike {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: Tasks);
    getPositions(): Positions;
}
