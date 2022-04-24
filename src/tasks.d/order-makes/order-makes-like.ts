import { HLike } from 'interfaces';
import { OpenOrder } from '../../interfaces';

export interface OrderMakesLike<H extends HLike<H>> {
	orderMakes(order: OpenOrder<H>): void;
}