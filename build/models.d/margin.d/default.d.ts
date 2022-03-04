import { Length } from 'interfaces';
import Big from 'big.js';
import { Context } from '../../context';
import { Assets } from '../assets';
import { Margin } from '../margin';
/**
 * 默认非实时结算
 */
export declare class DefaultMargin extends Margin {
    protected context: Context;
    constructor(context: Context);
    protected marginIncrement(length: Length, volume: Big, dollarVolume: Big): Big;
    protected marginDecrement(oldAssets: Assets, length: Length, volume: Big, dollarVolume: Big): Big;
}
