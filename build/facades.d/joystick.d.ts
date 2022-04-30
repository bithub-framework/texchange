import { Context } from '../context';
import { Config } from '../context.d/config';
import { HLike } from 'interfaces';
import { UpdateOrderbook, DatabaseOrderbook } from '../use-cases.d/update-orderbook';
import { UpdateTrades, DatabaseTrade } from '../use-cases.d/update-trades';
export declare class Joystick<H extends HLike<H>> {
    private context;
    private useCases;
    config: Config<H>;
    private TradeId;
    private DatabaseOrderbook;
    private DatabaseTrade;
    constructor(context: Context<H>, useCases: Joystick.UseCaseDeps<H>);
    updateTrades($trades: DatabaseTrade<H>[]): void;
    updateOrderbook($orderbook: DatabaseOrderbook<H>): void;
    quantity(price: H, dollarVolume: H): H;
    dollarVolume(price: H, quantity: H): H;
}
export declare namespace Joystick {
    interface UseCaseDeps<H extends HLike<H>> {
        updateTrades: UpdateTrades<H>;
        updateOrderbook: UpdateOrderbook<H>;
    }
}
