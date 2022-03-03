import { Models } from '../models';
import { Context } from '../context';
import { Tasks } from '../tasks';
import { UseCase } from './use-case';
import { Orderbook } from '../interfaces';
export declare class UpdateOrderbook extends UseCase {
    protected context: Context;
    protected models: Models;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, tasks: Tasks);
    updateOrderbook(orderbook: Readonly<Orderbook>): void;
}
