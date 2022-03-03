import { Models } from '../models';
import { Context } from '../context';
import { Positions } from '../interfaces';
import { Task } from './task';
import { Tasks, GetPositionsLike } from '../tasks';
export declare class GetPositions extends Task implements GetPositionsLike {
    protected context: Context;
    protected models: Models;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, tasks: Tasks);
    getPositions(): Positions;
}
