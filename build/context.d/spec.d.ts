import { MarketSpec, AccountSpec, HLike } from 'secretary-like';
export interface MarketConfig<H extends HLike<H>> extends MarketSpec<H> {
}
export interface AccountConfig<H extends HLike<H>> extends AccountSpec {
    readonly initialBalance: H;
}
export interface Spec<H extends HLike<H>> {
    market: MarketSpec<H>;
    account: AccountSpec;
}
