import { Length, H, HLike } from 'interfaces';
import { Model } from '../model';
import { Context } from '../context';
export declare class Margins<H extends HLike<H>> extends Model<H, Margins.Snapshot> {
    protected readonly context: Context<H>;
    protected margin: Margins.Margin.MutablePlain<H>;
    constructor(context: Context<H>);
    getMargin(): Margins.Margin<H>;
    setMargin(length: Length, margin: H): void;
    capture(): Margins.Snapshot;
    restore(snapshot: Margins.Snapshot): void;
}
export declare namespace Margins {
    interface Margin<H extends HLike<H>> {
        readonly [length: Length]: H;
    }
    namespace Margin {
        interface MutablePlain<H extends HLike<H>> {
            [length: Length]: H;
        }
        interface Snapshot {
            readonly [length: Length]: H.Snapshot;
        }
    }
    type Snapshot = Margin.Snapshot;
}
