import { Length, H, HLike, HStatic } from 'interfaces';
import { Context } from '../context';
import { StatefulLike } from '../stateful-like';
export declare class Margins<H extends HLike<H>> implements StatefulLike<Margins.Snapshot> {
    private context;
    private Margin;
    private $margin;
    constructor(context: Context<H>);
    getMargin(): Margins.Margin<H>;
    setMargin(length: Length, marginNumber: H): void;
    capture(): Margins.Snapshot;
    restore(snapshot: Margins.Snapshot): void;
}
export declare namespace Margins {
    interface Margin<H extends HLike<H>> {
        [length: Length]: H;
    }
    namespace Margin {
        interface Snapshot {
            [length: Length]: H.Snapshot;
        }
    }
    class MarginStatic<H extends HLike<H>> {
        private H;
        constructor(H: HStatic<H>);
        capture(margin: Margin<H>): Margin.Snapshot;
        restore(snapshot: Margin.Snapshot): Margin<H>;
        copy(margin: Margin<H>): Margin<H>;
    }
    type Snapshot = Margin.Snapshot;
}
