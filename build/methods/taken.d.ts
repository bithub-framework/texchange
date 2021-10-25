import { Trade } from '../interfaces';
import { Core } from '../core';
export declare class MethodsTaken {
    private core;
    constructor(core: Core);
    tradeTakesOpenMakers(trade: Trade): void;
    private tradeShouldTakeOpenOrder;
    /**
     * @param trade variable
     * @param maker variable
     */
    private tradeTakesOrderQueue;
    /**
     * @param trade variable
     * @param maker variable
     */
    private tradeTakesOpenMaker;
}
