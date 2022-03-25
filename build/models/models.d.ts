import { StatefulLike } from 'startable';
import { Assets } from '../models.d/assets';
import { Margins } from '../models.d/margins';
import { Makers } from '../models.d/makers/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing/pricing';
import { Context } from '../context/context';
import { HLike } from 'interfaces';
export declare abstract class Models<H extends HLike<H>> implements StatefulLike<Models.Snapshot> {
    assets: Assets<H>;
    margins: Margins<H>;
    abstract makers: Makers<H>;
    book: Book<H>;
    progress: Progress<H>;
    abstract pricing: Pricing<H, any>;
    constructor(context: Context<H>);
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
