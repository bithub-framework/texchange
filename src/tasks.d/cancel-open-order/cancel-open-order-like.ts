import {
	HLike,
	OpenOrder,
} from 'interfaces';


export interface CancelOpenOrderLike<H extends HLike<H>> {
	cancelOpenOrder(order: OpenOrder<H>): OpenOrder<H>;
}
