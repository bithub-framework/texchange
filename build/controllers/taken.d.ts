import { Trade } from '../interfaces';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { type Stages } from '../scheduler';
export declare namespace Taken {
    type Involved = keyof Pick<Models, 'assets' | 'margin' | 'makers'>;
}
import Involved = Taken.Involved;
export declare class Taken {
    private context;
    private models;
    private stages;
    static involved: Involved[];
    constructor(context: Context, models: Pick<Models, Involved>, stages: Pick<Stages, Involved>);
    tradeTakesOpenMakers(roTrade: Readonly<Trade>): void;
    private tradeShouldTakeOpenOrder;
    private tradeTakesOrderQueue;
    private tradeTakesOpenMaker;
}
