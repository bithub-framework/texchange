import { Models } from '../models';
import { Tasks } from '../tasks';
import { Context } from '../context';
export declare abstract class UseCase {
    protected context: Context;
    protected models: Models;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, tasks: Tasks);
}
