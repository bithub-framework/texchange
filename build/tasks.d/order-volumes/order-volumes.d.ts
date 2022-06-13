import { Context } from '../../context';
import { OrderVolumesLike } from './order-volumes-like';
import { Broadcast } from '../../broadcast';
import { HLike } from 'secretary-like';
import { MarginAccumulationLike } from '../margin-accumulation/margin-accumulation-like';
import { Assets } from '../../models.d/assets';
import { Margins } from '../../models.d/margins';
export declare class OrderVolumes<H extends HLike<H>> implements OrderVolumesLike<H> {
    private context;
    private models;
    private broadcast;
    private tasks;
    constructor(context: Context<H>, models: OrderVolumes.ModelDeps<H>, broadcast: Broadcast<H>);
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
