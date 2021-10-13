import { LimitOrder, OpenOrder, MarketCalc, Length } from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';
export declare class MethodsCalculation implements MarketCalc {
    private core;
    constructor(core: Core);
    dollarVolume(price: Big, quantity: Big): Big;
    quantity(price: Big, dollarVolume: Big): Big;
    initialMargin(order: LimitOrder): Big;
    marginIncrement(order: OpenOrder, volume: Big, dollarVolume: Big): Big;
    marginDecrement(order: OpenOrder, volume: Big, dollarVolume: Big): Big;
    totalMargin(): Big;
    balanceToFreeze(order: OpenOrder): Big;
    marginOnSettlement(length: Length, profit: Big): Big;
    shouldLiquidate(): Length[];
}
