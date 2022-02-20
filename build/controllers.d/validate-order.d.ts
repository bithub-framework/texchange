import { OpenOrder } from '../interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { GetAvailable } from './get-available';
import { GetClosable } from './get-closable';
import { ModelLike } from '../models.d/model';
import { ControllerLike } from './controller';
declare type OwnInvolved = Pick<Models, 'makers'>;
export declare namespace ValidateOrder {
    type Involved = OwnInvolved & GetAvailable.Involved & GetClosable.Involved;
}
export declare class ValidateOrder implements ControllerLike {
    private context;
    private models;
    private getAvailable;
    private getClosable;
    involved: ModelLike[];
    constructor(context: Context, models: OwnInvolved, getAvailable: GetAvailable, getClosable: GetClosable);
    validateOrder(order: Readonly<OpenOrder>): void;
    /**
     * Can be called only in consistent states
     */
    private validateQuantity;
    private validateFormat;
}
export {};
