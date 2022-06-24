import { Length, H, HLike, HStatic, MarketSpec, AccountSpec, Position } from 'secretary-like';
import { Executed } from '../../interfaces/executed';
import { Context } from '../../context';
import { StatefulLike } from '../../stateful-like';
import { Assets } from './assets';
export declare abstract class MarginAssets<H extends HLike<H>> implements StatefulLike<MarginAssets.Snapshot> {
    protected context: Context<H>;
    protected marketSpec: MarketSpec<H>;
    protected accountSpec: AccountSpec;
    protected assets: Assets<H>;
    protected Margin: MarginAssets.MarginStatic<H>;
    protected $accumulation: MarginAssets.Margin<H>;
    constructor(context: Context<H>, marketSpec: MarketSpec<H>, accountSpec: AccountSpec, assets: Assets<H>);
    open({ length, volume, dollarVolume, }: Executed<H>): void;
    close({ length, volume, dollarVolume, }: Executed<H>): void;
    abstract getFinalMargin(): H;
    abstract settle(length: Length, settlementPrice: H): void;
    abstract assertEnoughBalance(): void;
    capture(): MarginAssets.Snapshot;
    restore(snapshot: MarginAssets.Snapshot): void;
    getPosition(): Position<H>;
    getBalance(): H;
    getCost(): Assets.Cost<H>;
    pay(fee: H): void;
}
export declare namespace MarginAssets {
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
    type Cost<H extends HLike<H>> = Assets.Cost<H>;
    interface Snapshot {
        assets: Assets.Snapshot;
        margin: Margin.Snapshot;
    }
}
