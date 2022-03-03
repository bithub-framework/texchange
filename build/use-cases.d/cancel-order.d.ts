import { Models } from '../models';
import { Context } from '../context';
import { Tasks } from '../tasks';
import { OpenOrder } from 'interfaces';
import { UseCase } from './use-case';
import { Broadcast } from '../broadcast';
export declare class CancelOrder extends UseCase {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: Tasks);
    cancelOrder(order: Readonly<OpenOrder>): OpenOrder;
}
