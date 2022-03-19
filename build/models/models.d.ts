import { StatefulLike } from 'startable';
import { Assets } from '../models.d/assets';
import { Margins } from '../models.d/margins';
import { Makers } from '../models.d/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing';
import { Context } from '../context';
import { HLike } from 'interfaces';
export declare abstract class Models<H extends HLike<H>> implements StatefulLike<Models.Snapshot> {
    readonly assets: Assets<H>;
    readonly margins: Margins<H>;
    abstract readonly makers: Makers<H>;
    readonly book: Book<H>;
    readonly progress: Progress<H>;
    abstract readonly pricing: Pricing<H, any>;
    protected constructor(context: Context<H>);
    capture(): Models.Snapshot;
    restore(snapshot: Models.Snapshot): void;
}
export declare namespace Models {
    interface Snapshot {
        readonly assets: any;
        readonly margins: any;
        readonly makers: any;
        readonly book: any;
        readonly pricing: any;
        readonly progress: any;
    }
}
