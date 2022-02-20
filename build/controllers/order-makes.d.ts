import { OpenOrder } from '../interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';
export declare namespace OrderMakes {
    type Involved = Pick<Models, 'book' | 'makers'>;
}
import Involved = OrderMakes.Involved;
export declare class OrderMakes {
    private context;
    protected models: Involved;
    constructor(context: Context, models: Involved);
    involved: ModelLike[];
    orderMakes(openOrder: Readonly<OpenOrder>): void;
}
