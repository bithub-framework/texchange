export * from 'interfaces';
import { Trade, Assets, MarketConfig, AccountConfig } from 'interfaces';
import Big from 'big.js';
export declare type UnidentifiedTrade = Omit<Trade, 'id'>;
export declare type InitialAssets = Pick<Assets, 'balance' | 'cost' | 'position' | 'time'>;
export interface Config extends MarketConfig, AccountConfig {
    initialAssets: InitialAssets;
    PING: number;
    PROCESSING: number;
}
export declare function min(...a: Big[]): Big;
