export * from 'interfaces';
import { Trade, Assets, MarketConfig, AccountConfig, LimitOrder } from 'interfaces';
import Big from 'big.js';
export declare type UnidentifiedTrade = Omit<Trade, 'id'>;
export interface ExAssets extends Assets {
    cost: {
        [length: number]: Big;
    };
    frozenMargin: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    margin: Big;
    closable: {
        [length: number]: Big;
    };
}
export declare type InitialAssets = Pick<ExAssets, 'balance' | 'cost' | 'position' | 'time'>;
export interface ExMarketConfig extends MarketConfig {
    PING: number;
    PROCESSING: number;
    calcInitialMargin: (order: LimitOrder, settlementPrice: Big) => Big;
    calcPositionMargin: (assets: ExAssets) => Big;
}
export interface ExAccountConfig extends AccountConfig {
    initialAssets: InitialAssets;
}
export interface Config extends ExMarketConfig, ExAccountConfig {
}
export declare function min(...a: Big[]): Big;
