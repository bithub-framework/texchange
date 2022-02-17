import { OpenOrder } from '../interfaces';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { AccountView } from './account-view';
import { type Stages } from '../scheduler';
export declare namespace Validation {
    type Involved = keyof Pick<Models, 'makers'> | AccountView.Involved;
}
import Involved = Validation.Involved;
export declare class Validation {
    private context;
    private models;
    private stages;
    private accountView;
    static involved: Involved[];
    constructor(context: Context, models: Pick<Models, Involved>, stages: Pick<Stages, Involved>, accountView: AccountView);
    validateOrder(order: Readonly<OpenOrder>): void;
    /**
     * Can be called only in consistent states
     */
    private validateQuantity;
    private validateFormat;
}
