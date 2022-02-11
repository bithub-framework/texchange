import { Orderbook, DatabaseTrade } from '../interfaces';
import { type Hub } from '../hub';
export declare class Updating {
    private hub;
    constructor(hub: Hub);
    /**
     * Make sure update all trades which have same timestamp at a time.
     * @param trades
     */
    updateTrades(trades: DatabaseTrade[]): void;
    updateOrderbook(orderbook: Orderbook): void;
}
