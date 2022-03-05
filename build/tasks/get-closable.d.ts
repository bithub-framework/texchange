import { Closable } from 'interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { TasksLike, GetClosableLike } from '../tasks-like';
import { Broadcast } from '../broadcast';
export declare class GetClosable extends Task implements GetClosableLike {
    protected readonly context: Context;
    protected readonly models: Models;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike);
    getClosable(): Closable;
}
