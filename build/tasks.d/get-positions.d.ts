import { Models } from '../models';
import { Context } from '../context';
import { Positions } from 'interfaces';
import { Task } from './task';
import { TasksLike, GetPositionsLike } from '../tasks-like';
import { Broadcast } from '../broadcast';
export declare class GetPositions extends Task implements GetPositionsLike {
    protected readonly context: Context;
    protected readonly models: Models;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike);
    getPositions(): Positions;
}
