import { Trade } from '../interfaces';
import { Big } from 'big.js';
import { Core } from '../core';
export declare class MethodsTaken {
    private core;
    constructor(core: Core);
    private tradeShouldTakeOpenOrder;
    private tradeTakesOrderQueue;
    private tradeTakesOpenMaker;
    tradeTakesOpenMakers(trade: Trade): Big;
}
