import {
	Orderbook,
	DatabaseTrade,
} from '../interfaces';
import { type Hub } from '../hub';

export class Joystick {
	constructor(private hub: Hub) { }

	/**
	 * Make sure update all trades which have same timestamp at a time.
	 * @param trades
	 */
	public updateTrades(trades: DatabaseTrade[]): void {
		this.hub.presenters.updating.updateTrades(trades);
	}

	public updateOrderbook(orderbook: Orderbook): void {
		this.hub.presenters.updating.updateOrderbook(orderbook);
	}
}
