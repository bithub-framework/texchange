import { TexchangeOpenOrder, HLike } from 'interfaces';
import { Context } from '../../context';
import { Task } from '../../task';
import { ValidateOrderLike } from './validate-order-like';
import { Broadcast } from '../../broadcast';
import { GetAvailableLike } from '../get-available/get-available-like';
import { GetClosableLike } from '../get-closable/get-closable-like';
import { Makers } from '../../models.d/makers';
export declare class ValidateOrder<H extends HLike<H>> extends Task<H> implements ValidateOrderLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: ValidateOrder.ModelDeps<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: ValidateOrder.TaskDeps<H>;
    constructor(context: Context<H>, models: ValidateOrder.ModelDeps<H>, broadcast: Broadcast<H>, tasks: ValidateOrder.TaskDeps<H>);
    validateOrder(order: TexchangeOpenOrder<H>): void;
    private validateQuantity;
    private validateFormat;
}
export declare namespace ValidateOrder {
    interface ModelDeps<H extends HLike<H>> extends Task.ModelDeps<H> {
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> extends Task.TaskDeps<H> {
        getAvailable: GetAvailableLike<H>;
        getClosable: GetClosableLike<H>;
    }
}
