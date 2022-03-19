import { Context } from '../context';
import { Models } from '../models/models';
import { Task } from '../task';
import { Tasks, OrderVolumesLike } from '../tasks/tasks';
import { Broadcast } from '../broadcast';
import { HLike } from 'interfaces';
export declare class OrderVolumes<H extends HLike<H>> extends Task<H> implements OrderVolumesLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: Models<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: Tasks<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>, tasks: Tasks<H>);
    open({ length, volume, dollarVolume, }: OrderVolumesLike.Volumes<H>): void;
    close({ length, volume, dollarVolume, }: OrderVolumesLike.Volumes<H>): void;
}
