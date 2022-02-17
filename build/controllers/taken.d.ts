import { Trade } from '../interfaces';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { ModelLike } from '../models/model';
export declare namespace Taken {
    type Involved = Pick<Models, 'assets' | 'margin' | 'makers'>;
}
import Involved = Taken.Involved;
export declare class Taken {
    private context;
    private models;
    involved: ModelLike[];
    constructor(context: Context, models: Involved);
    tradeTakesOpenMakers(roTrade: Readonly<Trade>): void;
    private tradeShouldTakeOpenOrder;
    private tradeTakesOrderQueue;
    private tradeTakesOpenMaker;
}
