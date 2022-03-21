import { Context } from '../context';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import { Positions, HLike } from 'interfaces';
import { Assets } from '../models.d/assets';
import { GetClosableLike } from '../tasks.d/get-closable/get-closable-like';
export declare class GetPositions<H extends HLike<H>> extends UseCase<H> {
    protected readonly context: Context<H>;
    protected readonly models: GetPositions.ModelDeps<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: GetPositions.TaskDeps<H>;
    constructor(context: Context<H>, models: GetPositions.ModelDeps<H>, broadcast: Broadcast<H>, tasks: GetPositions.TaskDeps<H>);
    getPositions(): Positions<H>;
}
export declare namespace GetPositions {
    interface ModelDeps<H extends HLike<H>> extends UseCase.ModelDeps<H> {
        assets: Assets<H>;
    }
    interface TaskDeps<H extends HLike<H>> extends UseCase.TaskDeps<H> {
        getClosable: GetClosableLike<H>;
    }
}
