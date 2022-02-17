import { OpenOrder } from '../interfaces';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { AccountView } from './account-view';
import { ModelLike } from '../models/model';
export declare namespace Validation {
    type Involved = Pick<Models, 'makers'> & AccountView.Involved;
}
import Involved = Validation.Involved;
export declare class Validation {
    private context;
    private models;
    private accountView;
    involved: ModelLike[];
    constructor(context: Context, models: Involved, accountView: AccountView);
    validateOrder(order: Readonly<OpenOrder>): void;
    /**
     * Can be called only in consistent states
     */
    private validateQuantity;
    private validateFormat;
}
