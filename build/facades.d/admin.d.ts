import { Context } from '../context';
import { HLike, MarketSpec, AccountSpec } from 'secretary-like';
import { StartableLike } from 'startable';
import { StatefulLike } from '../stateful-like';
import { MarginAssets } from '../models.d/margin-assets';
import { Makers } from '../models.d/makers/makers';
import { Book } from '../models.d/book';
import { Pricing } from '../models.d/pricing/pricing';
import { Progress } from '../models.d/progress';
import { Mtm } from '../mark-to-market/mtm';
import { DatabaseOrderbook, DatabaseOrderbookId } from '../interfaces/database-orderbook';
import { UseCaseUpdateOrderbook } from '../use-cases.d/update-orderbook';
import { DatabaseTrade, DatabaseTradeId } from '../interfaces/database-trade';
import { UseCaseUpdateTrades } from '../use-cases.d/update-trades';
import { UseCaseGetProgress } from '../use-cases.d/get-progress';
export declare class AdminFacade<H extends HLike<H>> implements StatefulLike<Snapshot>, StartableLike {
    private context;
    private marketSpec;
    private accountSpec;
    private marginAssets;
    private book;
    private makers;
    private pricing;
    private progress;
    private mtm;
    private useCaseUpdateTrades;
    private useCaseUpdateOrderbook;
    private useCaseGetProgress;
    private startable;
    start: (onStopping?: import("startable").OnStopping | undefined) => Promise<void>;
    stop: (err?: Error | undefined) => Promise<void>;
    assart: (onStopping?: import("startable").OnStopping | undefined) => Promise<void>;
    starp: (err?: Error | undefined) => Promise<void>;
    getReadyState: () => import("startable").ReadyState;
    skipStart: (onStopping?: import("startable").OnStopping | undefined) => void;
    constructor(context: Context<H>, marketSpec: MarketSpec<H>, accountSpec: AccountSpec, marginAssets: MarginAssets<H>, book: Book<H>, makers: Makers<H>, pricing: Pricing<H, unknown>, progress: Progress<H>, mtm: Mtm<H> | null, useCaseUpdateTrades: UseCaseUpdateTrades<H>, useCaseUpdateOrderbook: UseCaseUpdateOrderbook<H>, useCaseGetProgress: UseCaseGetProgress<H>);
    getMarketSpec(): MarketSpec<H>;
    getAccountSpec(): AccountSpec;
    updateTrades($trades: DatabaseTrade<H>[]): void;
    updateOrderbook($orderbook: DatabaseOrderbook<H>): void;
    getLatestDatabaseOrderbookId(): DatabaseOrderbookId | null;
    getLatestDatabaseTradeId(): DatabaseTradeId | null;
    quantity(price: H, dollarVolume: H): H;
    dollarVolume(price: H, quantity: H): H;
    private rawStart;
    private rawStop;
    capture(): Snapshot;
    restore(snapshot: Snapshot): void;
}
export interface Snapshot {
    marginAssets: any;
    makers: any;
    book: any;
    pricing: any;
    progress: any;
}
