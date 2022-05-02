import { Context } from '../context';
import { Config } from '../context.d/config';
import { HLike } from 'interfaces';
import { StatefulLike } from '../stateful-like';
import { Models, Snapshot } from '../models';
import { Mtm } from '../mark-to-market/mtm';
import { DatabaseOrderbook, DatabaseOrderbookId } from '../interfaces/database-orderbook';
import { UpdateOrderbook } from '../use-cases.d/update-orderbook';
import { DatabaseTrade, DatabaseTradeId } from '../interfaces/database-trade';
import { UpdateTrades } from '../use-cases.d/update-trades';
import { GetProgress } from '../use-cases.d/get-progress';
export declare class Joystick<H extends HLike<H>, PricingSnapshot> implements StatefulLike<Snapshot<PricingSnapshot>> {
    private context;
    private models;
    private mtm;
    private useCases;
    private startable;
    config: Config<H>;
    constructor(context: Context<H>, models: Models<H, PricingSnapshot>, mtm: Mtm<H> | null, useCases: Joystick.UseCaseDeps<H>);
    Data: import("../interfaces/data").DataStatic<H>;
    updateTrades($trades: DatabaseTrade<H>[]): void;
    updateOrderbook($orderbook: DatabaseOrderbook<H>): void;
    getLatestDatabaseOrderbookId(): DatabaseOrderbookId | null;
    getLatestDatabaseTradeId(): DatabaseTradeId | null;
    quantity(price: H, dollarVolume: H): H;
    dollarVolume(price: H, quantity: H): H;
    private start;
    private stop;
    capture(): Snapshot<PricingSnapshot>;
    restore(snapshot: Snapshot<PricingSnapshot>): void;
}
export declare namespace Joystick {
    interface UseCaseDeps<H extends HLike<H>> {
        updateTrades: UpdateTrades<H>;
        updateOrderbook: UpdateOrderbook<H>;
        getProgress: GetProgress<H>;
    }
}
