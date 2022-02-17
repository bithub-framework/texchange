import { Context } from '../context/context';
import { Models } from '../models/models';
import { OpenOrder } from '../interfaces';
import { ModelLike } from '../models/model';
declare type Involved = Pick<Models, 'makers'>;
export declare class CancelOpenOrder {
    private context;
    private models;
    involved: ModelLike[];
    constructor(context: Context, models: Involved);
    cancelOpenOrder(order: Readonly<OpenOrder>): OpenOrder;
}
export {};
