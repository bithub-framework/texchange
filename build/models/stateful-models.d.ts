import { StatefulLike } from 'startable';
import { Assets } from '../models.d/assets';
import { Margin } from '../models.d/margin';
import { Makers } from '../models.d/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing';
import { ReadonlyRecur } from 'interfaces';
export declare abstract class StatefulModels implements StatefulLike<Snapshot> {
    abstract readonly assets: Assets;
    abstract readonly margin: Margin;
    abstract readonly makers: Makers;
    abstract readonly book: Book;
    abstract readonly progress: Progress;
    abstract readonly pricing: Pricing<any>;
    capture(): Snapshot;
    restore(snapshot: Snapshot): void;
}
export interface SnapshotStruct {
    assets: any;
    margin: any;
    makers: any;
    book: any;
    pricing: any;
    progress: any;
}
export declare namespace StatefulModels {
    type Snapshot = ReadonlyRecur<SnapshotStruct>;
}
import Snapshot = StatefulModels.Snapshot;
