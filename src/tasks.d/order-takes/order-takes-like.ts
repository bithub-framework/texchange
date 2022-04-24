import { HLike } from 'interfaces';
import {
	OpenOrder,
	Trades,
} from '../../interfaces';


export interface OrderTakesLike<H extends HLike<H>> {
	$orderTakes($taker: OpenOrder<H>): Trades<H>;
}
