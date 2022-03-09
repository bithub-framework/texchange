import { OpenOrder, Trade } from 'interfaces';
import { Context } from '../context';
import { ModelsStatic } from '../models/models-static';
import { Task } from '../task';
import { TasksLike, OrderTakesLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
export declare class OrderTakes extends Task implements OrderTakesLike {
    protected readonly context: Context;
    protected readonly models: ModelsStatic;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: ModelsStatic, broadcast: Broadcast, tasks: TasksLike);
    /**
     * @param taker variable
     */
    orderTakes(taker: OpenOrder): Trade[];
}
