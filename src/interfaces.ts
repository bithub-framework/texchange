export * from 'interfaces';
import {
    Trade,
    Assets,
    MarketConfig,
    AccountConfig,
    LimitOrder,
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
}

// 暂只支持一个用户，所以配置拼一起就行了
export interface Config extends ExMarketConfig, ExAccountConfig {
    // 均不需切小数
    calcInitialMargin: (
        config: MarketConfig & AccountConfig,
        order: LimitOrder,
        settlementPrice: Big,
    ) => Big,
    calcIncreasedMargin: (
        config: MarketConfig & AccountConfig,
        price: Big,
        volume: Big,
        settlementPrice: Big,
    ) => Big,
    calcDecreasedMargin: (
        config: MarketConfig & AccountConfig,
        assets: ExAssets,
        volume: Big,
    ) => Big,
    calcPositionMargin: (
        config: MarketConfig & AccountConfig,
        assets: Omit<ExAssets, 'margin' | 'reserve'>,
        settlementPrice: Big,
        originalMargin: Big,
    ) => Big,
}

export function min(...a: Big[]) {
    return a.reduce((m, x) => m.lt(x) ? m : x);
}
