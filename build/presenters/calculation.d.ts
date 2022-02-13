import { OpenOrder, MarketCalc, Length, Frozen } from '../interfaces';
import Big from 'big.js';
import { type Hub } from '../hub';
interface Deps extends Pick<Hub, 'context' | 'models'> {
}
export declare class Calculation implements MarketCalc {
    protected hub: Deps;
    constructor(hub: Deps);
    dollarVolume(price: Big, quantity: Big): Big;
    quantity(price: Big, dollarVolume: Big): Big;
    /**
     * this.hub.assets.position[order.length] has not been updated.
     */
    marginIncrement(length: Length, volume: Big, dollarVolume: Big): Big;
    /**
     * this.hub.assets.position[order.length] has not been updated.
     */
    marginDecrement(length: Length, volume: Big, dollarVolume: Big): Big;
    finalMargin(): Big;
    toFreeze(order: OpenOrder): Frozen;
    finalFrozenBalance(): Big;
    ClearingMargin(length: Length, profit: Big): Big;
    assertEnoughBalance(): void;
}
export {};
