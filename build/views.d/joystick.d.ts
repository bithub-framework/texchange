import { Context } from '../context';
import { UseCases } from '../use-cases';
import { Orderbook, DatabaseTrade } from '../interfaces';
export declare class Joystick {
    private context;
    private useCases;
    constructor(context: Context, useCases: UseCases);
    updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
    updateOrderbook(orderbook: Readonly<Orderbook>): void;
}
