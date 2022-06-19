import { Length, HLike, MarketSpec } from 'secretary-like';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { TaskSettle } from './settle';
/**
* 默认逐仓
*/
export declare class DefaultTaskSettle<H extends HLike<H>> extends TaskSettle<H> {
    protected context: Context<H>;
    protected marketSpec: MarketSpec<H>;
    protected models: DefaultTaskSettle.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    constructor(context: Context<H>, marketSpec: MarketSpec<H>, models: DefaultTaskSettle.ModelDeps<H>, broadcast: Broadcast<H>);
    protected clearingMargin(length: Length, profit: H): H;
    protected assertEnoughBalance(): void;
}
export declare namespace DefaultTaskSettle {
    interface ModelDeps<H extends HLike<H>> extends TaskSettle.ModelDeps<H> {
    }
    interface TaskDeps<H extends HLike<H>> extends TaskSettle.TaskDeps<H> {
    }
}
