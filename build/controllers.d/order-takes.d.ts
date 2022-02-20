import { OpenOrder, Trade } from '../interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';
export declare namespace OrderTakes {
    type Involved = Pick<Models, 'assets' | 'margin' | 'book' | 'progress'>;
}
import Involved = OrderTakes.Involved;
export declare class OrderTakes {
    private context;
    private models;
    involved: ModelLike[];
    constructor(context: Context, models: Involved);
    /**
     * @param taker variable
     */
    orderTakes(taker: OpenOrder): Trade[];
}
