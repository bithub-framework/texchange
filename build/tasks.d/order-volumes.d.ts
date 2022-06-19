import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike, Length, MarketSpec } from 'secretary-like';
import { TaskMarginAccumulation } from './margin-accumulation/margin-accumulation';
import { Assets } from '../models.d/assets';
import { Margins } from '../models.d/margins';
export declare class TaskOrderVolumes<H extends HLike<H>> {
    private context;
    private marketSpec;
    private models;
    private broadcast;
    private tasks;
    constructor(context: Context<H>, marketSpec: MarketSpec<H>, models: TaskOrderVolumes.ModelDeps<H>, broadcast: Broadcast<H>);
    open({ length, volume, dollarVolume, }: TaskOrderVolumes.Volumes<H>): void;
    close({ length, volume, dollarVolume, }: TaskOrderVolumes.Volumes<H>): void;
}
export declare namespace TaskOrderVolumes {
    interface Volumes<H extends HLike<H>> {
        length: Length;
        volume: H;
        dollarVolume: H;
    }
    interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
        margins: Margins<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
        marginAccumulation: TaskMarginAccumulation<H>;
    }
}
