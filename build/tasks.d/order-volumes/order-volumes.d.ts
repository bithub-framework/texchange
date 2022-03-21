import { Context } from '../../context';
import { Task } from '../../task';
import { OrderVolumesLike } from './order-volumes-like';
import { Broadcast } from '../../broadcast';
import { HLike } from 'interfaces';
import { MarginAccumulationLike } from '../margin-accumulation/margin-accumulation-like';
import { Assets } from '../../models.d/assets';
import { Margins } from '../../models.d/margins';
export declare class OrderVolumes<H extends HLike<H>> extends Task<H> implements OrderVolumesLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: OrderVolumes.ModelDeps<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: OrderVolumes.TaskDeps<H>;
    constructor(context: Context<H>, models: OrderVolumes.ModelDeps<H>, broadcast: Broadcast<H>, tasks: OrderVolumes.TaskDeps<H>);
    open({ length, volume, dollarVolume, }: OrderVolumesLike.Volumes<H>): void;
    close({ length, volume, dollarVolume, }: OrderVolumesLike.Volumes<H>): void;
}
export declare namespace OrderVolumes {
    interface Volumes<H extends HLike<H>> extends OrderVolumesLike.Volumes<H> {
    }
    interface ModelDeps<H extends HLike<H>> extends Task.ModelDeps<H> {
        assets: Assets<H>;
        margins: Margins<H>;
    }
    interface TaskDeps<H extends HLike<H>> extends Task.TaskDeps<H> {
        marginAccumulation: MarginAccumulationLike<H>;
    }
}
