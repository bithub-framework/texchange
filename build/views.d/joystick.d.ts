import { Context } from '../context/context';
import { Orderbook, HLike } from 'interfaces';
import { UpdateOrderbook } from '../use-cases.d/update-orderbook';
import { UpdateTrades, DatabaseTrades } from '../use-cases.d/update-trades';
export declare class Joystick<H extends HLike<H>> {
    private context;
    private useCases;
    private TradeId;
    private Trades;
    private Orderbook;
    constructor(context: Context<H>, useCases: Joystick.UseCaseDeps<H>);
    updateTrades($trades: DatabaseTrades<H>): void;
    updateOrderbook($orderbook: Orderbook<H>): void;
}
export declare namespace Joystick {
    interface UseCaseDeps<H extends HLike<H>> {
        updateTrades: UpdateTrades<H>;
        updateOrderbook: UpdateOrderbook<H>;
    }
}
