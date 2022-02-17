import { Context } from '../context/context';
import { Scheduler } from '../scheduler';
import { Orderbook, DatabaseTrade } from '../interfaces';
export declare class Joystick {
    private context;
    private scheduler;
    constructor(context: Context, scheduler: Scheduler);
    updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
    updateOrderbook(orderbook: Readonly<Orderbook>): void;
}
