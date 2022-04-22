import { Texchange, Snapshot } from './texchange';
import { HLike } from 'interfaces';
import { Config } from '../context.d/config';
import { HStatic, Timeline } from 'interfaces';
import { DefaultPricing } from '../models.d/pricing/default';
import { Models } from '../models';
export declare class DefaultTexchange<H extends HLike<H>> extends Texchange<H, DefaultPricing.Snapshot> {
    constructor(config: Config<H>, timeline: Timeline, H: HStatic<H>);
}
export interface DefaultModels<H extends HLike<H>> extends Models<H, DefaultPricing.Snapshot> {
}
export interface DefaultSnapshot extends Snapshot<DefaultPricing.Snapshot> {
}
