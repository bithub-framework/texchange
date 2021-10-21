import { Trade } from '../interfaces';
import { Core } from '../core';
export declare class MethodsTaken {
    private core;
    constructor(core: Core);
    private tradeShouldTakeOpenOrder;
    private tradeTakesOrderQueue;
    private tradeTakesOpenMaker;
    tradeTakesOpenMakers(trade: Trade): void;
}
