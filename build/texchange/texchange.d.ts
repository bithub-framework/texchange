import { HLike, HStatic } from 'interfaces';
import { StartableLike } from 'startable';
import { StatefulLike } from '../stateful-like';
import { Container } from 'injektor';
import { Config } from '../context.d/config';
import { Timeline } from 'interfaces';
import { Assets } from '../models.d/assets';
import { Margins } from '../models.d/margins';
import { Makers } from '../models.d/makers/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Models } from '../models';
import { Broadcast } from '../broadcast';
import { Mtm } from '../mark-to-market/mtm';
import { Latency } from '../facades.d/latency';
import { Joystick } from '../facades.d/joystick';
export declare abstract class Texchange<H extends HLike<H>, PricingSnapshot> implements StatefulLike<Snapshot<PricingSnapshot>> {
    protected c: Container;
    protected models: Models<H, PricingSnapshot>;
    protected broadcast: Broadcast<H>;
    protected mtm: Mtm<H> | null;
    user: Latency<H>;
    admin: Joystick<H>;
    startable: StartableLike;
    constructor(config: Config<H>, timeline: Timeline, H: HStatic<H>);
    private start;
    private stop;
    capture(): Snapshot<PricingSnapshot>;
    restore(snapshot: Snapshot<PricingSnapshot>): void;
}
export interface Snapshot<PricingSnapshot> {
    assets: Assets.Snapshot;
    margins: Margins.Snapshot;
    makers: Makers.Snapshot;
    book: Book.Snapshot;
    pricing: PricingSnapshot;
    progress: Progress.Snapshot;
}
