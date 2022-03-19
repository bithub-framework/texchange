import { TexchangeOpenOrder, TexchangeTrade, HLike } from 'interfaces';
import { Context } from '../context';
import { Models } from '../models/models';
import { Task } from '../task';
import { Tasks, OrderTakesLike } from '../tasks/tasks';
import { Broadcast } from '../broadcast';
export declare class OrderTakes<H extends HLike<H>> extends Task<H> implements OrderTakesLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: Models<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: Tasks<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>, tasks: Tasks<H>);
    /**
     * @param taker variable
     */
    orderTakes(taker: TexchangeOpenOrder.MutablePlain<H>): TexchangeTrade.MutablePlain<H>[];
}
