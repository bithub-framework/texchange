import { Length } from '../interfaces';
import Big from 'big.js';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { ModelLike } from '../models/model';
export declare namespace Clearing {
    type Involved = Pick<Models, 'assets' | 'pricing' | 'margin'>;
}
import Involved = Clearing.Involved;
export declare class Clearing {
    protected context: Context;
    protected models: Involved;
    constructor(context: Context, models: Involved);
    involved: ModelLike[];
    settle(): void;
    protected clearingMargin(length: Length, profit: Big): Big;
    protected assertEnoughBalance(): void;
}
