import { Models } from '../models';
import { Context } from '../context';
import { Tasks } from '../tasks';
import { UseCase } from './use-case';
import { Broadcast } from '../broadcast';
import { Positions } from 'interfaces';
export declare class GetPositions extends UseCase {
    protected context: Context;
    protected models: Models;
    protected broadcast: Broadcast;
    protected tasks: Tasks;
    constructor(context: Context, models: Models, broadcast: Broadcast, tasks: Tasks);
    getPositions(): Positions;
}
