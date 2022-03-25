import { Length, HLike } from 'interfaces';
import { Context } from '../../context/context';
import { Broadcast } from '../../broadcast';
import { Settle } from './settle';
/**
* 默认逐仓
*/
export declare class DefaultSettle<H extends HLike<H>> extends Settle<H> {
    protected models: DefaultSettle.ModelDeps<H>;
    protected tasks: DefaultSettle.TaskDeps<H>;
    constructor(context: Context<H>, models: DefaultSettle.ModelDeps<H>, broadcast: Broadcast<H>, tasks: DefaultSettle.TaskDeps<H>);
    protected clearingMargin(length: Length, profit: H): H;
    protected assertEnoughBalance(): void;
}
export declare namespace DefaultSettle {
    interface ModelDeps<H extends HLike<H>> extends Settle.ModelDeps<H> {
    }
    interface TaskDeps<H extends HLike<H>> extends Settle.TaskDeps<H> {
    }
}
