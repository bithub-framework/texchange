import { Trade } from '../interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';
import { ControllerLike } from './controller';
declare type OwnInvolved = Pick<Models, 'assets' | 'margin' | 'makers'>;
export declare namespace TradeTakesOpenMakers {
    type Involved = OwnInvolved;
}
export declare class TradeTakesOpenMakers implements ControllerLike {
    private context;
    private models;
    involved: ModelLike[];
    constructor(context: Context, models: OwnInvolved);
    tradeTakesOpenMakers(roTrade: Readonly<Trade>): void;
    private tradeShouldTakeOpenOrder;
    private tradeTakesOrderQueue;
    private tradeTakesOpenMaker;
}
export {};
