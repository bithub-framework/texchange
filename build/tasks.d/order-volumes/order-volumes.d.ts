import { Context } from '../../context/context';
import { OrderVolumesLike } from './order-volumes-like';
import { Broadcast } from '../../broadcast';
import { HLike } from 'interfaces';
import { MarginAccumulationLike } from '../margin-accumulation/margin-accumulation-like';
import { Assets } from '../../models.d/assets';
import { Margins } from '../../models.d/margins';
export declare class OrderVolumes<H extends HLike<H>> implements OrderVolumesLike<H> {
    protected context: Context<H>;
    protected models: OrderVolumes.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: OrderVolumes.TaskDeps<H>;
    constructor(context: Context<H>, models: OrderVolumes.ModelDeps<H>, broadcast: Broadcast<H>, tasks: OrderVolumes.TaskDeps<H>);
    open({ length, volume, dollarVolume, }: OrderVolumesLike.Volumes<H>): void;
    close({ length, volume, dollarVolume, }: OrderVolumesLike.Volumes<H>): void;
}
export declare namespace OrderVolumes {
    interface Volumes<H extends HLike<H>> extends OrderVolumesLike.Volumes<H> {
    }
    interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
        margins: Margins<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
        marginAccumulation: MarginAccumulationLike<H>;
    }
}
