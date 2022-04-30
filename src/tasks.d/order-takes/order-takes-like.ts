import {
	HLike,
	OpenOrder,
	Trade,
} from 'interfaces';


export interface OrderTakesLike<H extends HLike<H>> {
	$orderTakes($taker: OpenOrder<H>): Trade<H>[];
}
