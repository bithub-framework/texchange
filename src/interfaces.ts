export * from 'interfaces';
import {
    Trade,
    Assets,
    MarketConfig,
    AccountConfig,
} from 'interfaces';
import Big from 'big.js';

export type UnidentifiedTrade = Omit<Trade, 'id'>;

export type InitialAssets = Pick<Assets, 'balance' | 'cost' | 'position' | 'time'>;

export interface Config extends MarketConfig, AccountConfig {
    initialAssets: InitialAssets;

    PING: number;
    PROCESSING: number;
}

export function min(...a: Big[]) {
    return a.reduce((m, x) => m.lt(x) ? m : x);
}
