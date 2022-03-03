import { Models } from '../models';
import { Context } from '../context';
import { Balances } from '../interfaces';
import { Task } from './task';
import { Tasks, GetBalancesLike } from '../tasks';
export declare class GetBalances extends Task implements GetBalancesLike {
    protected context: Context;
    protected models: Models;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, tasks: Tasks);
    getBalances(): Balances;
}
