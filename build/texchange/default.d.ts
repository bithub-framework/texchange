import { Texchange, Snapshot } from './texchange';
import { HLike } from 'interfaces';
import { Config } from '../context.d/config';
import { HStatic, Timeline } from 'interfaces';
import { DefaultPricing } from '../models.d/pricing/default';
import { Models } from '../models';
import { Mtm } from '../mark-to-market/mtm';
import { Latency } from '../facades.d/latency';
import { Joystick } from '../facades.d/joystick';
export declare class DefaultTexchange<H extends HLike<H>> extends Texchange<H, DefaultPricing.Snapshot> {
    protected models: Models<H, DefaultPricing.Snapshot>;
    protected mtm: Mtm<H> | null;
    user: Latency<H>;
    admin: Joystick<H>;
    constructor(config: Config<H>, timeline: Timeline, H: HStatic<H>);
    capture(): DefaultSnapshot;
    restore(snapshot: DefaultSnapshot): void;
}
export interface DefaultModels<H extends HLike<H>> extends Models<H, DefaultPricing.Snapshot> {
}
export interface DefaultSnapshot extends Snapshot<DefaultPricing.Snapshot> {
}
