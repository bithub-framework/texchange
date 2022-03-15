import { Length, ConcretePosition, Position, HLike, H } from 'interfaces';
import { Context } from '../context';
import { Model } from '../model';
export declare class Assets<H extends HLike<H>> extends Model<H, Assets.Snapshot> {
    protected readonly context: Context<H>;
    private position;
    private balance;
    private cost;
    constructor(context: Context<H>);
    getBalance(): H;
    getPosition(): Readonly<ConcretePosition<H>>;
    getCost(): Readonly<Assets.Cost<H>>;
    capture(): Assets.Snapshot;
    restore(snapshot: Assets.Snapshot): void;
    payFee(fee: H): void;
    open({ length, volume, dollarVolume, }: Readonly<Assets.Volumes<H>>): void;
    /**
     * @returns Profit.
     */
    close({ length, volume, dollarVolume, }: Readonly<Assets.Volumes<H>>): H;
}
export declare namespace Assets {
    interface Cost<H extends HLike<H>> {
        readonly [length: Length]: H;
    }
    namespace Cost {
        interface MutablePlain<H extends HLike<H>> {
            [length: Length]: H;
        }
        interface Snapshot {
            readonly [length: Length]: H.Snapshot;
        }
    }
    interface Volumes<H extends HLike<H>> {
        readonly length: Length;
        readonly volume: H;
        readonly dollarVolume: H;
    }
    interface Snapshot {
        readonly position: Position.Snapshot;
        readonly balance: H.Snapshot;
        readonly cost: Cost.Snapshot;
    }
}
