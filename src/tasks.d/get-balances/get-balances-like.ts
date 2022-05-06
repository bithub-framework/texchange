import {
	HLike,
	Balances,
} from 'secretary-like';

export interface GetBalancesLike<H extends HLike<H>> {
	getBalances(): Balances<H>;
}
