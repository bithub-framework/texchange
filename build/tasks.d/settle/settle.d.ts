import { Length, HLike, MarketSpec } from 'secretary-like';
import { Assets } from '../../models.d/assets';
import { Margins } from '../../models.d/margins';
import { Pricing } from '../../models.d/pricing/pricing';
export declare abstract class TaskSettle<H extends HLike<H>> {
    protected tasks: TaskSettle.TaskDeps<H>;
    protected abstract marketSpec: MarketSpec<H>;
    protected abstract models: TaskSettle.ModelDeps<H>;
    settle(): void;
    protected abstract clearingMargin(length: Length, profit: H): H;
    protected abstract assertEnoughBalance(): void;
}
export declare namespace TaskSettle {
    interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
        margins: Margins<H>;
        pricing: Pricing<H, unknown>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}
