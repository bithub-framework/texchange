export * from 'interfaces';
import {
    Trade,
    Assets,
    MarketConfig,
    AccountConfig,
    LimitOrder,
    OpenOrder,
} from 'interfaces';
import Big from 'big.js';

export type UnidentifiedTrade = Omit<Trade, 'id'>;

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

export type InitialAssets = Pick<ExAssets, 'balance' | 'cost' | 'position' | 'time'>;

export interface ExMarketConfig extends MarketConfig {
    PING: number;
    PROCESSING: number;
}

export interface ExAccountConfig extends AccountConfig {
    initialAssets: InitialAssets;

    calcInitialMargin: (
        config: MarketConfig & AccountConfig,
        order: LimitOrder,
        settlementPrice: Big,
        latestPrice: Big,
    ) => Big,
    calcMarginIncrement: (
        config: MarketConfig & AccountConfig,
        price: Big,
        volume: Big,
    ) => Big,
    calcMarginDecrement: (
        config: MarketConfig & AccountConfig,
        assets: ExAssets,
        volume: Big,
    ) => Big,
    calcMargin: (
        config: MarketConfig & AccountConfig,
        assets: Omit<ExAssets, 'margin' | 'reserve'>,
        settlementPrice: Big,
        latestPrice: Big,
        autoMargin: Big,
    ) => Big,
    calcFrozenMargin: (
        config: MarketConfig & AccountConfig,
        order: OpenOrder,
        settlementPrice: Big,
        latestPrice: Big,
    ) => Big,
}

export interface Config extends ExMarketConfig, ExAccountConfig { }

export function min(...a: Big[]) {
    return a.reduce((m, x) => m.lt(x) ? m : x);
}
