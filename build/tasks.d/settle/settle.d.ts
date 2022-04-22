import { Length, HLike } from 'interfaces';
import { Context } from '../../context';
import { SettleLike } from './settle-like';
import { Broadcast } from '../../broadcast';
import { Assets } from '../../models.d/assets';
import { Margins } from '../../models.d/margins';
import { Pricing } from '../../models.d/pricing/pricing';
export declare abstract class Settle<H extends HLike<H>> implements SettleLike {
    protected context: Context<H>;
    protected models: Settle.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    static TaskDeps: {};
    protected abstract tasks: Settle.TaskDeps<H>;
    constructor(context: Context<H>, models: Settle.ModelDeps<H>, broadcast: Broadcast<H>);
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
