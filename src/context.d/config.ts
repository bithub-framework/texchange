import {
	MarketSpec,
	AccountSpec,
	MarketCalc,
} from 'interfaces';
import Big from 'big.js';

export interface MarketConfig extends MarketSpec, MarketCalc {
	readonly PING: number;
	readonly PROCESSING: number;
	readonly initialSettlementPrice: Big;
}

export interface AccountConfig extends AccountSpec {
	readonly initialBalance: Big;
}

export interface Config extends MarketConfig, AccountConfig {
	readonly marketName: string;
}
