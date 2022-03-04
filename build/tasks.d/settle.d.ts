import { Length } from 'interfaces';
import Big from 'big.js';
import { Context } from '../context';
import { Models } from '../models';
import { Task } from './task';
import { TasksLike, SettleLike } from '../tasks-like';
import { Broadcast } from '../broadcast';
export declare abstract class Settle extends Task implements SettleLike {
    protected abstract context: Context;
    protected abstract models: Models;
    protected abstract broadcast: Broadcast;
    protected abstract tasks: TasksLike;
    settle(): void;
    protected abstract clearingMargin(length: Length, profit: Big): Big;
    protected abstract assertEnoughBalance(): void;
}
