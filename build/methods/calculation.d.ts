import { OpenOrder, MarketCalc, Length, Frozen } from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';
export declare class MethodsCalculation implements MarketCalc {
    private core;
    constructor(core: Core);
    dollarVolume(price: Big, quantity: Big): Big;
    quantity(price: Big, dollarVolume: Big): Big;
    marginIncrement(length: Length, volume: Big, dollarVolume: Big): Big;
    marginDecrement(length: Length, volume: Big, dollarVolume: Big): Big;
    totalMargin(): Big;
    toFreeze(order: OpenOrder): Frozen;
    totalFrozenBalance(): Big;
    marginOnSettlement(length: Length, profit: Big): Big;
    shouldLiquidate(): Length[];
}
