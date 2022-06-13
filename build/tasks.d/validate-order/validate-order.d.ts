import { HLike, OpenOrder } from 'secretary-like';
import { Context } from '../../context';
import { ValidateOrderLike } from './validate-order-like';
import { Broadcast } from '../../broadcast';
import { GetAvailableLike } from '../get-available/get-available-like';
import { GetClosableLike } from '../get-closable/get-closable-like';
import { Makers } from '../../models.d/makers/makers';
export declare class ValidateOrder<H extends HLike<H>> implements ValidateOrderLike<H> {
    private context;
    private models;
    private broadcast;
    private tasks;
    constructor(context: Context<H>, models: ValidateOrder.ModelDeps<H>, broadcast: Broadcast<H>);
    validateOrder(order: OpenOrder<H>): void;
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
