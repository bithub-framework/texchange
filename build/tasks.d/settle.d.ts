import { Length } from 'interfaces';
import Big from 'big.js';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { Tasks, SettleLike } from '../tasks';
import { Broadcast } from '../broadcast';
export declare class Settle extends Task implements SettleLike {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: Tasks);
    settle(): void;
    protected clearingMargin(length: Length, profit: Big): Big;
    protected assertEnoughBalance(): void;
}
