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
}
export interface ExAccountConfig extends AccountConfig {
    initialAssets: InitialAssets;
}
export interface Config extends ExMarketConfig, ExAccountConfig {
    calcInitialMargin: (config: MarketConfig & AccountConfig, order: LimitOrder, settlementPrice: Big) => Big;
    calcIncreasedMargin: (config: MarketConfig & AccountConfig, price: Big, volume: Big, settlementPrice: Big) => Big;
    calcDecreasedMargin: (config: MarketConfig & AccountConfig, assets: ExAssets, volume: Big) => Big;
    calcPositionMargin: (config: MarketConfig & AccountConfig, assets: Omit<ExAssets, 'margin' | 'reserve'>, settlementPrice: Big, originalMargin: Big) => Big;
}
export declare function min(...a: Big[]): Big;
