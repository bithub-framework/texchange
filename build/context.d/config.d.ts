import { MarketSpec, AccountSpec, MarketCalc } from 'interfaces';
import { HLike } from 'interfaces';
export interface MarketConfig<H extends HLike<H>> extends MarketSpec<H>, MarketCalc<H> {
    readonly PING: number;
    readonly PROCESSING: number;
    readonly initialSettlementPrice: H;
}
export interface AccountConfig<H extends HLike<H>> extends AccountSpec {
    readonly initialBalance: H;
}
export interface Config<H extends HLike<H>> {
    readonly market: MarketConfig<H>;
    readonly account: AccountConfig<H>;
}
