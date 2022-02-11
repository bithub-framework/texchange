import { Trade } from '../interfaces';
import { type Hub } from '../hub';
export declare class Taken {
    private hub;
    constructor(hub: Hub);
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
