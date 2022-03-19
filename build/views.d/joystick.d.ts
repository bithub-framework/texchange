import { Context } from '../context';
import { UseCases } from '../use-cases';
import { DatabaseTrade } from '../models.d/progress';
import { Orderbook, HLike } from 'interfaces';
export declare class Joystick<H extends HLike<H>> {
    private context;
    private useCases;
    constructor(context: Context<H>, useCases: UseCases<H>);
    updateTrades(trades: readonly DatabaseTrade<H>[]): void;
    updateOrderbook(orderbook: Orderbook<H>): void;
}
