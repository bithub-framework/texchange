import { Length, HLike, MarketSpec } from 'secretary-like';
import { TaskSettle } from './settle';
/**
* 默认逐仓
*/
export declare class DefaultTaskSettle<H extends HLike<H>> extends TaskSettle<H> {
    protected marketSpec: MarketSpec<H>;
    protected models: DefaultTaskSettle.ModelDeps<H>;
    constructor(marketSpec: MarketSpec<H>, models: DefaultTaskSettle.ModelDeps<H>);
    protected clearingMargin(length: Length, profit: H): H;
    protected assertEnoughBalance(): void;
}
export declare namespace DefaultTaskSettle {
    interface ModelDeps<H extends HLike<H>> extends TaskSettle.ModelDeps<H> {
    }
    interface TaskDeps<H extends HLike<H>> extends TaskSettle.TaskDeps<H> {
    }
}
