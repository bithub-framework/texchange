import { Models } from '../models';
import { Context } from '../context';
import { TasksLike } from '../tasks-like';
import { UseCase } from './use-case';
import { Broadcast } from '../broadcast';
import { Positions } from 'interfaces';
export declare class GetPositions extends UseCase {
    protected readonly context: Context;
    protected readonly models: Models;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike);
    getPositions(): Positions;
}
