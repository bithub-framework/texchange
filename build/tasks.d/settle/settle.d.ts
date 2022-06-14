import { Length, HLike } from 'secretary-like';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { Assets } from '../../models.d/assets';
import { Margins } from '../../models.d/margins';
import { Pricing } from '../../models.d/pricing/pricing';
export declare abstract class TaskSettle<H extends HLike<H>> {
    protected tasks: TaskSettle.TaskDeps<H>;
    protected abstract context: Context<H>;
    protected abstract models: TaskSettle.ModelDeps<H>;
    protected abstract broadcast: Broadcast<H>;
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
