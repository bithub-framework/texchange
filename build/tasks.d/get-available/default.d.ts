import { HLike, MarketSpec } from 'secretary-like';
import { Context } from '../../context';
import { TaskGetAvailable } from './get-available';
import { Margins } from '../../models.d/margins';
import { Makers } from '../../models.d/makers/makers';
export declare class DefaultTaskGetAvailable<H extends HLike<H>> extends TaskGetAvailable<H> {
    protected context: Context<H>;
    protected marketSpec: MarketSpec<H>;
    protected models: DefaultGetAvailable.ModelDeps<H>;
    constructor(context: Context<H>, marketSpec: MarketSpec<H>, models: DefaultGetAvailable.ModelDeps<H>);
    protected finalMargin(): H;
    protected finalFrozenBalance(): H;
}
export declare namespace DefaultGetAvailable {
    interface ModelDeps<H extends HLike<H>> extends TaskGetAvailable.ModelDeps<H> {
        margins: Margins<H>;
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> extends TaskGetAvailable.TaskDeps<H> {
    }
}
