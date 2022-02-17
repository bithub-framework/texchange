import { OpenOrder } from '../interfaces';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { ModelLike } from '../models/model';
export declare namespace Making {
    type Involved = Pick<Models, 'book' | 'makers'>;
}
import Involved = Making.Involved;
export declare class Making {
    private context;
    protected models: Involved;
    constructor(context: Context, models: Involved);
    involved: ModelLike[];
    orderMakes(openOrder: Readonly<OpenOrder>): void;
}
