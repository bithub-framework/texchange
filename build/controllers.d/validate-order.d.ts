import { OpenOrder } from '../interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { GetAvailable } from './get-available';
import { GetClosable } from './get-closable';
import { ModelLike } from '../models.d/model';
export declare namespace ValidateOrder {
    type Involved = Pick<Models, 'makers'> & GetAvailable.Involved & GetClosable.Involved;
}
import Involved = ValidateOrder.Involved;
export declare class ValidateOrder {
    private context;
    private models;
    private getAvailable;
    private getClosable;
    involved: ModelLike[];
    constructor(context: Context, models: Involved, getAvailable: GetAvailable, getClosable: GetClosable);
    validateOrder(order: Readonly<OpenOrder>): void;
    /**
     * Can be called only in consistent states
     */
    private validateQuantity;
    private validateFormat;
}
