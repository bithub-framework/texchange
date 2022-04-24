import { HLike } from 'interfaces';
import {
	Amendment as GenericAmendment,
	AmendmentStatic as GenericAmendmentStatic
} from 'interfaces';
import { OrderId } from './order-id';


export interface Amendment<H extends HLike<H>>
	extends GenericAmendment<H, OrderId> { }

export class AmendmentStatic<H extends HLike<H>>
	extends GenericAmendmentStatic<H, OrderId>{ }

export namespace Amendment {
	export import Snapshot = GenericAmendment.Snapshot;
}