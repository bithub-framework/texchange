import { OpenOrder, Trade } from '../interfaces';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { ModelLike } from '../models/model';
export declare namespace Taking {
    type Involved = Pick<Models, 'assets' | 'margin' | 'book' | 'progress'>;
}
import Involved = Taking.Involved;
export declare class Taking {
    private context;
    private models;
    involved: ModelLike[];
    constructor(context: Context, models: Involved);
    /**
     * @param taker variable
     */
    orderTakes(taker: OpenOrder): Trade[];
}
