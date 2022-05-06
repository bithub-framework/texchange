import { Length, HLike } from 'secretary-like';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { Settle } from './settle';
/**
* 默认逐仓
*/
export declare class DefaultSettle<H extends HLike<H>> extends Settle<H> {
    protected tasks: DefaultSettle.TaskDeps<H>;
    protected models: DefaultSettle.ModelDeps<H>;
    constructor(tasks: DefaultSettle.TaskDeps<H>, context: Context<H>, models: DefaultSettle.ModelDeps<H>, broadcast: Broadcast<H>);
    protected clearingMargin(length: Length, profit: H): H;
    protected assertEnoughBalance(): void;
}
export declare namespace DefaultSettle {
    interface ModelDeps<H extends HLike<H>> extends Settle.ModelDeps<H> {
    }
    interface TaskDeps<H extends HLike<H>> extends Settle.TaskDeps<H> {
    }
}
