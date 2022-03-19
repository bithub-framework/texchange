import { TexchangeOpenOrder, HLike } from 'interfaces';
import { Context } from '../context';
import { Models } from '../models/models';
import { Task } from '../task';
import { Tasks, ValidateOrderLike } from '../tasks/tasks';
import { Broadcast } from '../broadcast';
export declare class ValidateOrder<H extends HLike<H>> extends Task<H> implements ValidateOrderLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: Models<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: Tasks<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>, tasks: Tasks<H>);
    validateOrder(order: TexchangeOpenOrder<H>): void;
    private validateQuantity;
    private validateFormat;
}
