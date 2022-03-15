import { HLike } from 'interfaces';
import { Context } from '../../context';
import { StatefulModels } from '../../models/stateful-models';
import { TasksLike } from '../../tasks/tasks-like';
import { Broadcast } from '../../broadcast';
import { MarginAccumulation } from './margin-accumulation';
export declare class DefaultMarginAccumulation<H extends HLike<H>> extends MarginAccumulation<H> {
    protected readonly context: Context<H>;
    protected readonly models: StatefulModels<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: TasksLike<H>;
    constructor(context: Context<H>, models: StatefulModels<H>, broadcast: Broadcast<H>, tasks: TasksLike<H>);
    newMarginAfterOpening({ length, volume, dollarVolume, }: MarginAccumulation.Volumes<H>): H;
    newMarginAfterClosing({ length, volume, dollarVolume, }: MarginAccumulation.Volumes<H>): H;
}
