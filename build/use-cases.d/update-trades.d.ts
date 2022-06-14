import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike } from 'secretary-like';
import { DatabaseTrade } from '../interfaces/database-trade';
import { TaskTradeTakesOpenMakers } from '../tasks.d/trade-takes-open-makers';
import { TaskSettle } from '../tasks.d/settle/settle';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing/pricing';
export declare class UseCaseUpdateTrades<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: UseCaseUpdateTrades.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: UseCaseUpdateTrades.TaskDeps<H>;
    private realTimeSettlement;
    constructor(context: Context<H>, models: UseCaseUpdateTrades.ModelDeps<H>, broadcast: Broadcast<H>, tasks: UseCaseUpdateTrades.TaskDeps<H>, realTimeSettlement: boolean);
    updateTrades(trades: DatabaseTrade<H>[]): void;
}
export declare namespace UseCaseUpdateTrades {
    interface ModelDeps<H extends HLike<H>> {
        progress: Progress<H>;
        pricing: Pricing<H, unknown>;
    }
    interface TaskDeps<H extends HLike<H>> {
        tradeTakesOpenMakers: TaskTradeTakesOpenMakers<H>;
        settle: TaskSettle<H>;
    }
}
