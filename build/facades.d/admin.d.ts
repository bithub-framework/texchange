import { Context } from '../context';
import { Spec } from '../context.d/spec';
import { HLike } from 'secretary-like';
import { StatefulLike } from '../stateful-like';
import { Models } from '../texchange/models';
import { Mtm } from '../mark-to-market/mtm';
import { DatabaseOrderbook, DatabaseOrderbookId } from '../interfaces/database-orderbook';
import { UseCaseUpdateOrderbook } from '../use-cases.d/update-orderbook';
import { DatabaseTrade, DatabaseTradeId } from '../interfaces/database-trade';
import { UseCaseUpdateTrades } from '../use-cases.d/update-trades';
import { UseCaseGetProgress } from '../use-cases.d/get-progress';
export declare class AdminFacade<H extends HLike<H>> implements StatefulLike<Models.Snapshot> {
    private context;
    private models;
    private mtm;
    private useCases;
    private startable;
    config: Spec<H>;
    constructor(context: Context<H>, models: Models<H>, mtm: Mtm<H> | null, useCases: Joystick.UseCaseDeps<H>);
    Data: import("../interfaces/data").DataStatic<H>;
    updateTrades($trades: DatabaseTrade<H>[]): void;
    updateOrderbook($orderbook: DatabaseOrderbook<H>): void;
    getLatestDatabaseOrderbookId(): DatabaseOrderbookId | null;
    getLatestDatabaseTradeId(): DatabaseTradeId | null;
    quantity(price: H, dollarVolume: H): H;
    dollarVolume(price: H, quantity: H): H;
    private start;
    private stop;
    capture(): Models.Snapshot;
    restore(snapshot: Models.Snapshot): void;
}
export declare namespace Joystick {
    interface UseCaseDeps<H extends HLike<H>> {
        updateTrades: UseCaseUpdateTrades<H>;
        updateOrderbook: UseCaseUpdateOrderbook<H>;
        getProgress: UseCaseGetProgress<H>;
    }
}
