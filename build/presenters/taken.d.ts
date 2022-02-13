import { Trade } from '../interfaces';
import { type Hub } from '../hub';
export declare class Taken {
    private hub;
    constructor(hub: Hub);
    tradeTakesOpenMakers(roTrade: Readonly<Trade>): void;
    private tradeShouldTakeOpenOrder;
    private tradeTakesOrderQueue;
    private tradeTakesOpenMaker;
}
