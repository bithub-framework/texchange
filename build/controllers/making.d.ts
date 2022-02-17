import { OpenOrder } from '../interfaces';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { type Stages } from '../scheduler';
export declare namespace Making {
    type Involved = keyof Pick<Models, 'book' | 'makers'>;
}
import Involved = Making.Involved;
export declare class Making {
    private context;
    protected models: Pick<Models, Involved>;
    protected stages: Pick<Stages, Involved>;
    static involved: Involved[];
    constructor(context: Context, models: Pick<Models, Involved>, stages: Pick<Stages, Involved>);
    orderMakes(openOrder: Readonly<OpenOrder>): void;
}
