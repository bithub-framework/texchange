import { Context } from '../context';
import { UseCasesLike } from '../use-cases';
import { DatabaseTrade } from '../models.d/progress';
import { Orderbook } from 'interfaces';
export declare class Joystick {
    private context;
    private useCases;
    constructor(context: Context, useCases: UseCasesLike);
    updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
    updateOrderbook(orderbook: Readonly<Orderbook>): void;
}
