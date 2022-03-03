import { Models } from '../models';
import { Context } from '../context';
import { Tasks } from '../tasks';
import { UseCase } from './use-case';
import { DatabaseTrade } from '../interfaces';
export declare class UpdateTrades extends UseCase {
    protected context: Context;
    protected models: Models;
    protected tasks: Tasks;
    private realTimeSettlement;
    constructor(context: Context, models: Models, tasks: Tasks, realTimeSettlement: boolean);
    updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
}
