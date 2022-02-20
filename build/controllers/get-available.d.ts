import Big from 'big.js';
import { Context } from '../context';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';
export declare namespace GetAvailable {
    type Involved = Pick<Models, 'assets' | 'makers' | 'margin'>;
}
import Involved = GetAvailable.Involved;
export declare class GetAvailable {
    protected context: Context;
    protected models: Involved;
    involved: ModelLike[];
    constructor(context: Context, models: Involved);
    getAvailable(): Big;
    protected finalMargin(): Big;
    protected finalFrozenBalance(): Big;
}
