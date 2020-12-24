export * from 'interfaces';
import { Trade } from 'interfaces';
import Big from 'big.js';
export declare type RawTrade = Omit<Trade, 'id'>;
export interface Config {
    initialBalance: Big;
    leverage: number;
    PING: number;
    PROCESSING: number;
    MAKER_FEE: number;
    TAKER_FEE: number;
    PRICE_DP: number;
    QUANTITY_DP: number;
    CURRENCY_DP: number;
    calcDollarVolume: (price: Big, quantity: Big) => Big;
}
export declare function min(...a: Big[]): Big;
