import { Length, HLike, MarketSpecLike, AccountSpecLike, PositionLike } from 'secretary-like';
import { Executed } from '../../data-types/executed';
import { VirtualMachineContextLike } from '../../vmctx';
import { StatefulLike } from '../../stateful-like';
import { Assets } from './assets/assets';
import { Margin, MarginFactory } from './margin';
import { Cost } from './assets/cost';
export declare abstract class MarginAssets<H extends HLike<H>> implements StatefulLike<MarginAssets.Snapshot> {
    protected context: VirtualMachineContextLike<H>;
    protected marketSpec: MarketSpecLike<H>;
    protected accountSpec: AccountSpecLike;
    protected assets: Assets<H>;
    protected marginFactory: MarginFactory<H>;
    protected $margin: Margin<H>;
    constructor(context: VirtualMachineContextLike<H>, marketSpec: MarketSpecLike<H>, accountSpec: AccountSpecLike, assets: Assets<H>);
    open({ length, volume, dollarVolume, }: Executed<H>): void;
    close({ length, volume, dollarVolume, }: Executed<H>): void;
    abstract getFinalMargin(): H;
    abstract settle(length: Length, settlementPrice: H): void;
    abstract assertEnoughBalance(): void;
    capture(): MarginAssets.Snapshot;
    restore(snapshot: MarginAssets.Snapshot): void;
    getPosition(): PositionLike<H>;
    getBalance(): H;
    getCost(): Cost<H>;
    pay(fee: H): void;
}
export declare namespace MarginAssets {
    interface Snapshot {
        assets: Assets.Snapshot;
        margin: Margin.Snapshot;
    }
}
