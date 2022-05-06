import { Context } from '../../context';
import { Positions, HLike } from 'secretary-like';
import { GetPositionsLike } from './get-positions-like';
import { Broadcast } from '../../broadcast';
import { Assets } from '../../models.d/assets';
import { GetClosableLike } from '../get-closable/get-closable-like';
export declare class GetPositions<H extends HLike<H>> implements GetPositionsLike<H> {
    private tasks;
    private context;
    private models;
    private broadcast;
    constructor(tasks: GetPositions.TaskDeps<H>, context: Context<H>, models: GetPositions.ModelDeps<H>, broadcast: Broadcast<H>);
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
