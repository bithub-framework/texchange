import { Length, HLike } from 'secretary-like';
import { Context } from '../../context';
import { SettleLike } from './settle-like';
import { Broadcast } from '../../broadcast';
import { Assets } from '../../models.d/assets';
import { Margins } from '../../models.d/margins';
import { Pricing } from '../../models.d/pricing/pricing';
export declare abstract class Settle<H extends HLike<H>> implements SettleLike {
    protected tasks: Settle.TaskDeps<H>;
    protected abstract context: Context<H>;
    protected abstract models: Settle.ModelDeps<H>;
    protected abstract broadcast: Broadcast<H>;
    settle(): void;
    protected abstract clearingMargin(length: Length, profit: H): H;
    protected abstract assertEnoughBalance(): void;
}
export declare namespace Settle {
    interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
        margins: Margins<H>;
        pricing: Pricing<H, unknown>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}
