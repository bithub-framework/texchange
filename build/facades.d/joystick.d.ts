import { Context } from '../context';
import { Config } from '../context.d/config';
import { Orderbook, HLike } from 'interfaces';
import { UpdateOrderbook } from '../use-cases.d/update-orderbook';
import { UpdateTrades, DatabaseTrades } from '../use-cases.d/update-trades';
export declare class Joystick<H extends HLike<H>> {
    private context;
    private useCases;
    config: Config<H>;
    private TradeId;
    private Trades;
    private Orderbook;
    constructor(context: Context<H>, useCases: Joystick.UseCaseDeps<H>);
    updateTrades($trades: DatabaseTrades<H>): void;
    updateOrderbook($orderbook: Orderbook<H>): void;
    quantity(price: H, dollarVolume: H): H;
    dollarVolume(price: H, quantity: H): H;
}
export declare namespace Joystick {
    interface UseCaseDeps<H extends HLike<H>> {
        updateTrades: UpdateTrades<H>;
        updateOrderbook: UpdateOrderbook<H>;
    }
}
