import { Length, HLike } from 'interfaces';
import { Context } from '../../context/context';
import { SettleLike } from './settle-like';
import { Broadcast } from '../../broadcast';
import { Assets } from '../../models.d/assets';
import { Margins } from '../../models.d/margins';
import { Pricing } from '../../models.d/pricing/pricing';
export declare abstract class Settle<H extends HLike<H>> implements SettleLike {
    protected abstract readonly context: Context<H>;
    protected abstract readonly models: Settle.ModelDeps<H>;
    protected abstract readonly broadcast: Broadcast<H>;
    protected abstract readonly tasks: Settle.TaskDeps<H>;
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
