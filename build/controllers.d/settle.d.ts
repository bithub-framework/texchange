import { Length } from '../interfaces';
import Big from 'big.js';
import { Context } from '../context';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';
import { ControllerLike } from './controller';
declare type OwnInvolved = Pick<Models, 'assets' | 'pricing' | 'margin'>;
export declare namespace Settle {
    type Involved = OwnInvolved;
}
export declare class Settle implements ControllerLike {
    protected context: Context;
    protected models: OwnInvolved;
    constructor(context: Context, models: OwnInvolved);
    involved: ModelLike[];
    settle(): void;
    protected clearingMargin(length: Length, profit: Big): Big;
    protected assertEnoughBalance(): void;
}
export {};
