import { Context } from '../context';
import { DatabaseTrade } from '../models.d/progress';
import { Orderbook, HLike } from 'interfaces';
import { UpdateOrderbook } from '../use-cases.d/update-orderbook';
import { UpdateTrades } from '../use-cases.d/update-trades';
export declare class Joystick<H extends HLike<H>> {
    private context;
    private useCases;
    constructor(context: Context<H>, useCases: Joystick.UseCaseDeps<H>);
    updateTrades(trades: readonly DatabaseTrade<H>[]): void;
    updateOrderbook(orderbook: Orderbook<H>): void;
}
export declare namespace Joystick {
    interface UseCaseDeps<H extends HLike<H>> {
        updateTrades: UpdateTrades<H>;
        updateOrderbook: UpdateOrderbook<H>;
    }
}
