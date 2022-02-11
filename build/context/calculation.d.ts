import { OpenOrder, MarketCalc, Length, Frozen } from '../interfaces';
import Big from 'big.js';
import { type Hub } from '../hub';
export interface CalculationLike extends MarketCalc {
    marginIncrement(length: Length, volume: Big, dollarVolume: Big): Big;
    finalMargin(): Big;
    toFreeze(order: OpenOrder): Frozen;
    finalFrozenBalance(): Big;
    marginOnSettlement(length: Length, profit: Big): Big;
    shouldLiquidate(): Length[];
}
export declare class DefaultCalculation implements MarketCalc {
    private hub;
    constructor(hub: Hub);
    dollarVolume(price: Big, quantity: Big): Big;
    quantity(price: Big, dollarVolume: Big): Big;
    marginIncrement(length: Length, volume: Big, dollarVolume: Big): Big;
    finalMargin(): Big;
    toFreeze(order: OpenOrder): Frozen;
    finalFrozenBalance(): Big;
    marginOnSettlement(length: Length, profit: Big): Big;
    shouldLiquidate(): Length[];
}
