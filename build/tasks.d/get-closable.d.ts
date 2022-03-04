import { Closable } from 'interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { TasksLike, GetClosableLike } from '../tasks-like';
import { Broadcast } from '../broadcast';
export declare class GetClosable extends Task implements GetClosableLike {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: TasksLike;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: TasksLike);
    getClosable(): Closable;
}
