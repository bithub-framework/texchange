import { Closable } from '../interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { Tasks, GetClosableLike } from '../tasks';
export declare class GetClosable extends Task implements GetClosableLike {
    protected context: Context;
    protected models: Models;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, tasks: Tasks);
    getClosable(): Closable;
}
