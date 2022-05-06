import {
	HLike,
	OpenOrder,
} from 'secretary-like';

export interface ValidateOrderLike<H extends HLike<H>> {
	validateOrder(order: OpenOrder<H>): void;
}
