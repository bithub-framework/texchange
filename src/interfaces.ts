export * from 'interfaces';
import {
    Trade,
    Positions,
    Balances,
    MarketConfig,
    AccountConfig,
    LimitOrder,
    OpenOrder,
} from 'interfaces';
import Big from 'big.js';

export type UnidentifiedTrade = Omit<Trade, 'id'>;

export interface Assets extends
    Positions,
    Balances { }

export interface ExAssets extends Omit<Assets, 'time'> {
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

export interface ExMarketConfig extends MarketConfig {
    PING: number;
    PROCESSING: number;
    initialSettlementPrice: Big;
}

export interface ExAccountConfig extends AccountConfig {
    initialBalance: Big;

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
