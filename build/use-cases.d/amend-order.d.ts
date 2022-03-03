import { Models } from '../models';
import { Context } from '../context';
import { Tasks } from '../tasks';
import { UseCase } from './use-case';
import { Amendment, OpenOrder } from '../interfaces';
export declare class AmendOrder extends UseCase {
    protected context: Context;
    protected models: Models;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, tasks: Tasks);
    amendOrder(amendment: Readonly<Amendment>): OpenOrder;
}
