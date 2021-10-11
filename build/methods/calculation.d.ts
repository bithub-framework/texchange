import { LimitOrder, OpenOrder, OpenMaker, MarketCalc } from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';
export declare class MethodsCalculation implements MarketCalc {
    private core;
    constructor(core: Core);
    dollarVolume(price: Big, quantity: Big): Big;
    quantity(price: Big, dollarVolume: Big): Big;
    initialMargin(order: LimitOrder): Big;
    positionMarginIncrement(order: OpenOrder, volume: Big, dollarVolume: Big): Big;
    positionMarginDecrement(order: OpenOrder, volume: Big, dollarVolume: Big): Big;
    totalPositionMargin(): Big;
    freezingMargin(order: OpenMaker | LimitOrder): Big;
    positionMarginOnClearing(): Big;
    shouldBeCompulsorilyLiquidated(): boolean;
}
