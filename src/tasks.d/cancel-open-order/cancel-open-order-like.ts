import {
	HLike,
	OpenOrder,
} from 'secretary-like';


export interface CancelOpenOrderLike<H extends HLike<H>> {
	cancelOpenOrder(order: OpenOrder<H>): OpenOrder<H>;
}
