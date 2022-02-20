import { Trade } from '../interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';
export declare namespace TradeTakesOpenMakers {
    type Involved = Pick<Models, 'assets' | 'margin' | 'makers'>;
}
import Involved = TradeTakesOpenMakers.Involved;
export declare class TradeTakesOpenMakers {
    private context;
    private models;
    involved: ModelLike[];
    constructor(context: Context, models: Involved);
    tradeTakesOpenMakers(roTrade: Readonly<Trade>): void;
    private tradeShouldTakeOpenOrder;
    private tradeTakesOrderQueue;
    private tradeTakesOpenMaker;
}
