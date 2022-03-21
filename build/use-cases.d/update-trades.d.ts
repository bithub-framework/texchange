import { Context } from '../context';
import { UseCase } from '../use-case';
import { DatabaseTrade } from '../models.d/progress';
import { Broadcast } from '../broadcast';
import { HLike } from 'interfaces';
import { TradeTakesOpenMakersLike } from '../tasks.d/trade-takes-open-makers/trade-takes-open-makers-like';
import { SettleLike } from '../tasks.d/settle/settle-like';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing';
export declare class UpdateTrades<H extends HLike<H>> extends UseCase<H> {
    protected readonly context: Context<H>;
    protected readonly models: UpdateTrades.ModelDeps<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: UpdateTrades.TaskDeps<H>;
    private readonly realTimeSettlement;
    constructor(context: Context<H>, models: UpdateTrades.ModelDeps<H>, broadcast: Broadcast<H>, tasks: UpdateTrades.TaskDeps<H>, realTimeSettlement: boolean);
    updateTrades(trades: readonly DatabaseTrade<H>[]): void;
}
export declare namespace UpdateTrades {
    interface ModelDeps<H extends HLike<H>> extends UseCase.ModelDeps<H> {
        progress: Progress<H>;
        pricing: Pricing<H, unknown>;
    }
    interface TaskDeps<H extends HLike<H>> extends UseCase.TaskDeps<H> {
        tradeTakesOpenMakers: TradeTakesOpenMakersLike<H>;
        settle: SettleLike;
    }
}
