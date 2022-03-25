import { Closable, HLike } from 'interfaces';
import { Context } from '../../context/context';
import { GetClosableLike } from './get-closable-like';
import { Broadcast } from '../../broadcast';
import { Assets } from '../../models.d/assets';
import { Makers } from '../../models.d/makers/makers';
export declare class GetClosable<H extends HLike<H>> implements GetClosableLike<H> {
    protected context: Context<H>;
    protected models: GetClosable.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: GetClosable.TaskDeps<H>;
    constructor(context: Context<H>, models: GetClosable.ModelDeps<H>, broadcast: Broadcast<H>, tasks: GetClosable.TaskDeps<H>);
    getClosable(): Closable<H>;
}
export declare namespace GetClosable {
    interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}
