import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike, HStatic, Trade } from 'interfaces';
import { TradeTakesOpenMakersLike } from '../tasks.d/trade-takes-open-makers/trade-takes-open-makers-like';
import { SettleLike } from '../tasks.d/settle/settle-like';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing/pricing';
export declare class UpdateTrades<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: UpdateTrades.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: UpdateTrades.TaskDeps<H>;
    private realTimeSettlement;
    constructor(context: Context<H>, models: UpdateTrades.ModelDeps<H>, broadcast: Broadcast<H>, tasks: UpdateTrades.TaskDeps<H>, realTimeSettlement: boolean);
    updateTrades(trades: DatabaseTrade<H>[]): void;
}
export declare namespace UpdateTrades {
    interface ModelDeps<H extends HLike<H>> {
        progress: Progress<H>;
        pricing: Pricing<H, unknown>;
    }
    interface TaskDeps<H extends HLike<H>> {
        tradeTakesOpenMakers: TradeTakesOpenMakersLike<H>;
        settle: SettleLike;
    }
}
export interface DatabaseTrade<H extends HLike<H>> extends Trade<H> {
    id: string;
}
export declare class DatabaseTradeStatic<H extends HLike<H>> {
    private H;
    private Trade;
    constructor(H: HStatic<H>);
    copy(trade: DatabaseTrade<H>): DatabaseTrade<H>;
}
