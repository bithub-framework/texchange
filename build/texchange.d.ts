import { HLike } from 'interfaces';
import { StartableLike } from 'startable';
import { StatefulLike } from './stateful-like';
import { Assets } from './models.d/assets';
import { Margins } from './models.d/margins';
import { Makers } from './models.d/makers/makers';
import { Book } from './models.d/book';
import { Progress } from './models.d/progress';
import { Models } from './models';
import { Mtm } from './mark-to-market/mtm';
import { Latency } from './facades.d/latency/latency';
import { Joystick } from './facades.d/joystick';
export declare class Texchange<H extends HLike<H>, PricingSnapshot> implements StatefulLike<Snapshot<PricingSnapshot>> {
    protected models: Models<H, PricingSnapshot>;
    protected mtm: Mtm<H> | null;
    user: Latency<H>;
    admin: Joystick<H>;
    startable: StartableLike;
    constructor(models: Models<H, PricingSnapshot>, mtm: Mtm<H> | null, user: Latency<H>, admin: Joystick<H>);
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
