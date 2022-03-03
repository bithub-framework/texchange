import Big from 'big.js';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { Tasks, GetAvailableLike } from '../tasks';
export declare class GetAvailable extends Task implements GetAvailableLike {
    protected context: Context;
    protected models: Models;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, tasks: Tasks);
    getAvailable(): Big;
    protected finalMargin(): Big;
    protected finalFrozenBalance(): Big;
}
