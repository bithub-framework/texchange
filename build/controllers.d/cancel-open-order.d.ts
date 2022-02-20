import { Context } from '../context';
import { Models } from '../models';
import { OpenOrder } from '../interfaces';
import { ModelLike } from '../models.d/model';
declare type Involved = Pick<Models, 'makers'>;
export declare class CancelOpenOrder {
    private context;
    private models;
    involved: ModelLike[];
    constructor(context: Context, models: Involved);
    cancelOpenOrder(order: Readonly<OpenOrder>): OpenOrder;
}
export {};
