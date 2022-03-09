import { Closable } from 'interfaces';
import { Context } from '../context';
import { ModelsStatic } from '../models/models-static';
import { Task } from '../task';
import { TasksLike, GetClosableLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
export declare class GetClosable extends Task implements GetClosableLike {
    protected readonly context: Context;
    protected readonly models: ModelsStatic;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: ModelsStatic, broadcast: Broadcast, tasks: TasksLike);
    getClosable(): Closable;
}
