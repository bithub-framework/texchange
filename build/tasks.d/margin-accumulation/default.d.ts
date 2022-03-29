import { HLike } from 'interfaces';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { MarginAccumulation } from './margin-accumulation';
import { Margins } from '../../models.d/margins';
import { Assets } from '../../models.d/assets';
export declare class DefaultMarginAccumulation<H extends HLike<H>> extends MarginAccumulation<H> {
    protected models: DefaultMarginAccumulation.ModelDeps<H>;
    protected tasks: DefaultMarginAccumulation.TaskDeps<H>;
    constructor(context: Context<H>, models: DefaultMarginAccumulation.ModelDeps<H>, broadcast: Broadcast<H>);
    newMarginAfterOpening({ length, volume, dollarVolume, }: MarginAccumulation.Volumes<H>): H;
    newMarginAfterClosing({ length, volume, dollarVolume, }: MarginAccumulation.Volumes<H>): H;
}
export declare namespace DefaultMarginAccumulation {
    type Volumes<H extends HLike<H>> = MarginAccumulation.Volumes<H>;
    interface ModelDeps<H extends HLike<H>> extends MarginAccumulation.ModelDeps<H> {
        margins: Margins<H>;
        assets: Assets<H>;
    }
    interface TaskDeps<H extends HLike<H>> extends MarginAccumulation.TaskDeps<H> {
    }
    const TaskDeps: {};
}
