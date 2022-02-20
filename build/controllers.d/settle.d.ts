import { Length } from '../interfaces';
import Big from 'big.js';
import { Context } from '../context';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';
export declare namespace Settle {
    type Involved = Pick<Models, 'assets' | 'pricing' | 'margin'>;
}
import Involved = Settle.Involved;
export declare class Settle {
    protected context: Context;
    protected models: Involved;
    constructor(context: Context, models: Involved);
    involved: ModelLike[];
    settle(): void;
    protected clearingMargin(length: Length, profit: Big): Big;
    protected assertEnoughBalance(): void;
}
