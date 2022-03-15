import { StatefulLike } from 'startable';
import { Assets } from '../models.d/assets';
import { Margins } from '../models.d/margins';
import { Makers } from '../models.d/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing';
import { HLike } from 'interfaces';
export declare abstract class StatefulModels<H extends HLike<H>> implements StatefulLike<StatefulModels.Snapshot> {
    abstract readonly assets: Assets<H>;
    abstract readonly margins: Margins<H>;
    abstract readonly makers: Makers<H>;
    abstract readonly book: Book<H>;
    abstract readonly progress: Progress<H>;
    abstract readonly pricing: Pricing<H, any>;
    capture(): StatefulModels.Snapshot;
    restore(snapshot: StatefulModels.Snapshot): void;
}
export declare namespace StatefulModels {
    interface Snapshot {
        readonly assets: any;
        readonly margins: any;
        readonly makers: any;
        readonly book: any;
        readonly pricing: any;
        readonly progress: any;
    }
}
