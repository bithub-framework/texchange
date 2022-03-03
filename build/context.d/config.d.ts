import { MarketSpec, AccountSpec, MarketCalc } from 'interfaces';
import Big from 'big.js';
export interface MarketConfig extends MarketSpec, MarketCalc {
    PING: number;
    PROCESSING: number;
    initialSettlementPrice: Big;
}
export interface AccountConfig extends AccountSpec {
    initialBalance: Big;
}
export interface Config extends MarketConfig, AccountConfig {
    marketName: string;
}
