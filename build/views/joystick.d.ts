import { Context } from '../context/context';
import { Tasks } from '../tasks/tasks';
import { Orderbook, DatabaseTrade } from '../interfaces';
export declare class Joystick {
    private context;
    private tasks;
    constructor(context: Context, tasks: Tasks);
    updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
    updateOrderbook(orderbook: Readonly<Orderbook>): void;
}
