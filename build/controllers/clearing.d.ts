import { Length } from '../interfaces';
import Big from 'big.js';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { type Stages } from '../scheduler';
export declare namespace Clearing {
    type Involved = keyof Pick<Models, 'assets' | 'pricing' | 'margin'>;
}
import Involved = Clearing.Involved;
export declare class Clearing {
    protected context: Context;
    protected models: Pick<Models, Involved>;
    protected stages: Pick<Stages, Involved>;
    constructor(context: Context, models: Pick<Models, Involved>, stages: Pick<Stages, Involved>);
    static involved: Involved[];
    settle(): void;
    protected clearingMargin(length: Length, profit: Big): Big;
    protected assertEnoughBalance(): void;
}
