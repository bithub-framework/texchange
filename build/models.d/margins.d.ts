import { Length, H, HLike, HStatic } from 'interfaces';
import { Context } from '../context/context';
import { StatefulLike } from 'startable';
export declare class Margins<H extends HLike<H>> implements StatefulLike<Margins.Snapshot> {
    private readonly context;
    private margin;
    private Margin;
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
    class MarginStatic<H extends HLike<H>> {
        private H;
        constructor(H: HStatic<H>);
        capture(margin: Margin<H>): Margin.Snapshot;
        restore(snapshot: Margin.Snapshot): Margin.MutablePlain<H>;
    }
    type Snapshot = Margin.Snapshot;
}
