import { HLike, AccountSpec } from 'secretary-like';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { TaskMarginAccumulation } from './margin-accumulation';
import { Margins } from '../../models.d/margins';
import { Assets } from '../../models.d/assets';
export declare class DefaultTaskMarginAccumulation<H extends HLike<H>> extends TaskMarginAccumulation<H> {
    protected context: Context<H>;
    private accountSpec;
    protected models: DefaultTaskMarginAccumulation.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    constructor(context: Context<H>, accountSpec: AccountSpec, models: DefaultTaskMarginAccumulation.ModelDeps<H>, broadcast: Broadcast<H>);
    newMarginAfterOpening({ length, volume, dollarVolume, }: TaskMarginAccumulation.Volumes<H>): H;
    newMarginAfterClosing({ length, volume, dollarVolume, }: TaskMarginAccumulation.Volumes<H>): H;
}
export declare namespace DefaultTaskMarginAccumulation {
    type Volumes<H extends HLike<H>> = TaskMarginAccumulation.Volumes<H>;
    interface ModelDeps<H extends HLike<H>> extends TaskMarginAccumulation.ModelDeps<H> {
        margins: Margins<H>;
        assets: Assets<H>;
    }
    interface TaskDeps<H extends HLike<H>> extends TaskMarginAccumulation.TaskDeps<H> {
    }
}
