import { Context } from '../../context';
import { Positions, HLike } from 'interfaces';
import { Task } from '../../task';
import { GetPositionsLike } from './get-positions-like';
import { Broadcast } from '../../broadcast';
import { Assets } from '../../models.d/assets';
import { GetClosableLike } from '../get-closable/get-closable-like';
export declare class GetPositions<H extends HLike<H>> extends Task<H> implements GetPositionsLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: GetPositions.ModelDeps<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: GetPositions.TaskDeps<H>;
    constructor(context: Context<H>, models: GetPositions.ModelDeps<H>, broadcast: Broadcast<H>, tasks: GetPositions.TaskDeps<H>);
    getPositions(): Positions<H>;
}
export declare namespace GetPositions {
    interface ModelDeps<H extends HLike<H>> extends Task.ModelDeps<H> {
        assets: Assets<H>;
    }
    interface TaskDeps<H extends HLike<H>> extends Task.TaskDeps<H> {
        getClosable: GetClosableLike<H>;
    }
}
