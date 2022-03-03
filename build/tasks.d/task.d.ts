import { Models } from '../models';
import { Context } from '../context';
import { Tasks } from '../tasks';
export declare abstract class Task {
    protected context: Context;
    protected models: Models;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, tasks: Tasks);
}
