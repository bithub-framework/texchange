import { Trade } from '../interfaces';
import { type Hub } from '../hub';
interface Deps extends Pick<Hub, 'context' | 'models'> {
}
export declare class Taken {
    private hub;
    constructor(hub: Deps);
    tradeTakesOpenMakers(roTrade: Readonly<Trade>): void;
    private tradeShouldTakeOpenOrder;
    private tradeTakesOrderQueue;
    private tradeTakesOpenMaker;
}
export {};
