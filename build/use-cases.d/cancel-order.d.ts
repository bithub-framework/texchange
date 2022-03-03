import { Models } from '../models';
import { Context } from '../context';
import { Tasks } from '../tasks';
import { OpenOrder } from '../interfaces';
import { UseCase } from './use-case';
export declare class CancelOrder extends UseCase {
    protected context: Context;
    protected models: Models;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, tasks: Tasks);
    cancelOrder(order: Readonly<OpenOrder>): OpenOrder;
}
