import { ModelsStatic } from '../models/models-static';
import { Context } from '../context';
import { Positions } from 'interfaces';
import { Task } from '../task';
import { TasksLike, GetPositionsLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
export declare class GetPositions extends Task implements GetPositionsLike {
    protected readonly context: Context;
    protected readonly models: ModelsStatic;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: ModelsStatic, broadcast: Broadcast, tasks: TasksLike);
    getPositions(): Positions;
}
