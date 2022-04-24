import { HLike } from 'interfaces';
import { OpenOrder } from '../../interfaces';


export interface MakeOpenOrderLike<H extends HLike<H>> {
	makeOpenOrder(order: OpenOrder<H>): OpenOrder<H>;
}
