import { OpenOrder, Trade } from '../interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';
import { ControllerLike } from './controller';
declare type OwnInvolved = Pick<Models, 'assets' | 'margin' | 'book' | 'progress'>;
export declare namespace OrderTakes {
    type Involved = OwnInvolved;
}
export declare class OrderTakes implements ControllerLike {
    private context;
    private models;
    involved: ModelLike[];
    constructor(context: Context, models: OwnInvolved);
    /**
     * @param taker variable
     */
    orderTakes(taker: OpenOrder): Trade[];
}
export {};
