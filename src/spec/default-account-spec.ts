import { AccountSpecLike } from 'secretary-like';


export class DefaultAccountSpec implements AccountSpecLike {
	public LEVERAGE = 2;
	public MAKER_FEE_RATE = -.00025;
	public TAKER_FEE_RATE = .00075;
}
