import { OpenOrder, Trade } from '../interfaces';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { type Stages } from '../scheduler';
export declare namespace Taking {
    type Involved = keyof Pick<Models, 'assets' | 'margin' | 'book' | 'progress'>;
}
import Involved = Taking.Involved;
export declare class Taking {
    private context;
    private models;
    private stages;
    static involved: Involved[];
    constructor(context: Context, models: Pick<Models, Involved>, stages: Pick<Stages, Involved>);
    /**
     * @param taker variable
     */
    orderTakes(taker: OpenOrder): Trade[];
}
