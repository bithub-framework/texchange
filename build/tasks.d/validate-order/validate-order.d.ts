import { TexchangeOpenOrder, HLike } from 'interfaces';
import { Context } from '../../context/context';
import { ValidateOrderLike } from './validate-order-like';
import { Broadcast } from '../../broadcast';
import { GetAvailableLike } from '../get-available/get-available-like';
import { GetClosableLike } from '../get-closable/get-closable-like';
import { Makers } from '../../models.d/makers/makers';
export declare class ValidateOrder<H extends HLike<H>> implements ValidateOrderLike<H> {
    protected context: Context<H>;
    protected models: ValidateOrder.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: ValidateOrder.TaskDeps<H>;
    private OrderId;
    private OpenOrder;
    constructor(context: Context<H>, models: ValidateOrder.ModelDeps<H>, broadcast: Broadcast<H>, tasks: ValidateOrder.TaskDeps<H>);
    validateOrder(order: TexchangeOpenOrder<H>): void;
    private validateQuantity;
    private validateFormat;
}
export declare namespace ValidateOrder {
    interface ModelDeps<H extends HLike<H>> {
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
        getAvailable: GetAvailableLike<H>;
        getClosable: GetClosableLike<H>;
    }
}
