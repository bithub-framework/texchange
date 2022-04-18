import { Texchange, Models, Snapshot } from './texchange';
import { HLike } from 'interfaces';
import { Context } from '../context';
import { Config } from '../context.d/config';
import { HStatic, Timeline } from 'interfaces';
import { DefaultPricing } from '../models.d/pricing/default';
import { Broadcast } from '../broadcast';
import { Tasks } from './texchange';
import { Mtm } from '../mark-to-market/mtm';
import { UseCases } from './texchange';
import { Facades } from './texchange';
import { Latency } from '../facades.d/latency';
import { Joystick } from '../facades.d/joystick';
export declare class DefaultTexchange<H extends HLike<H>> extends Texchange<H, DefaultPricing.Snapshot> {
    protected context: Context<H>;
    protected models: DefaultModels<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: Tasks<H>;
    protected mtm: Mtm<H> | null;
    protected useCases: UseCases<H>;
    protected facades: Facades<H>;
    user: Latency<H>;
    admin: Joystick<H>;
    constructor(config: Config<H>, timeline: Timeline, H: HStatic<H>);
    private assembleContext;
    private assembleModels;
    private assembleTasks;
    private assembleUseCases;
    private assembleViews;
    capture(): DefaultSnapshot;
    restore(snapshot: DefaultSnapshot): void;
}
export interface DefaultModels<H extends HLike<H>> extends Models<H, DefaultPricing.Snapshot> {
}
export interface DefaultSnapshot extends Snapshot<DefaultPricing.Snapshot> {
}
