import Big from 'big.js';
import { Context } from '../context';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';
import { ControllerLike } from './controller';
declare type OwnInvolved = Pick<Models, 'assets' | 'makers' | 'margin'>;
export declare namespace GetAvailable {
    type Involved = OwnInvolved;
}
export declare class GetAvailable implements ControllerLike {
    protected context: Context;
    protected models: OwnInvolved;
    involved: ModelLike[];
    constructor(context: Context, models: OwnInvolved);
    getAvailable(): Big;
    protected finalMargin(): Big;
    protected finalFrozenBalance(): Big;
}
export {};
