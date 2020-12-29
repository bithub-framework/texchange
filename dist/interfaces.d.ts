export * from 'interfaces';
import { Trade, Assets } from 'interfaces';
import Big from 'big.js';
export declare type RawTrade = Omit<Trade, 'id'>;
export interface Config {
    initialAssets: Assets;
    leverage: number;
    PING: number;
    PROCESSING: number;
    MAKER_FEE_RATE: number;
    TAKER_FEE_RATE: number;
    PRICE_DP: number;
    QUANTITY_DP: number;
    CURRENCY_DP: number;
    calcDollarVolume: (price: Big, quantity: Big) => Big;
}
export declare function min(...a: Big[]): Big;
