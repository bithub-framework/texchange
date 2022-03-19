import { HLike } from 'interfaces';
import { Context } from '../../context';
import { Models } from '../../models/models';
import { Tasks } from '../../tasks/tasks';
import { Broadcast } from '../../broadcast';
import { MarginAccumulation } from './margin-accumulation';
export declare class DefaultMarginAccumulation<H extends HLike<H>> extends MarginAccumulation<H> {
    protected readonly context: Context<H>;
    protected readonly models: Models<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: Tasks<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>, tasks: Tasks<H>);
    newMarginAfterOpening({ length, volume, dollarVolume, }: MarginAccumulation.Volumes<H>): H;
    newMarginAfterClosing({ length, volume, dollarVolume, }: MarginAccumulation.Volumes<H>): H;
}
