import { HLike, Balances } from 'interfaces';
export interface GetBalancesLike<H extends HLike<H>> {
    getBalances(): Balances<H>;
}
