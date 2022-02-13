import { Orderbook, DatabaseTrade } from '../interfaces';
import { type Hub } from '../hub';
export declare class Joystick {
    private hub;
    constructor(hub: Hub);
    updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
    updateOrderbook(orderbook: Readonly<Orderbook>): void;
}
