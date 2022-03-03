import { Closable } from 'interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { Tasks, GetClosableLike } from '../tasks';
import { Broadcast } from '../broadcast';
export declare class GetClosable extends Task implements GetClosableLike {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: Tasks);
    getClosable(): Closable;
}
