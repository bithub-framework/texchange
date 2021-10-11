import { Orderbook, DatabaseTrade } from '../interfaces';
import { Core } from '../core';
export declare class MethodsUpdating {
    private core;
    constructor(core: Core);
    updateTrades(trades: DatabaseTrade[]): void;
    updateOrderbook(orderbook: Orderbook): void;
}
