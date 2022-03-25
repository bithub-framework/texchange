import { Context } from '../../context/context';
import { Positions, HLike } from 'interfaces';
import { GetPositionsLike } from './get-positions-like';
import { Broadcast } from '../../broadcast';
import { Assets } from '../../models.d/assets';
import { GetClosableLike } from '../get-closable/get-closable-like';
export declare class GetPositions<H extends HLike<H>> implements GetPositionsLike<H> {
    protected context: Context<H>;
    protected models: GetPositions.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: GetPositions.TaskDeps<H>;
    constructor(context: Context<H>, models: GetPositions.ModelDeps<H>, broadcast: Broadcast<H>, tasks: GetPositions.TaskDeps<H>);
    getPositions(): Positions<H>;
}
export declare namespace GetPositions {
    interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
        getClosable: GetClosableLike<H>;
    }
}
