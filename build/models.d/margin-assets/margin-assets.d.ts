import { Length, HLike, MarketSpec, AccountSpec, Position } from 'secretary-like';
import { Executed } from '../../data-types/executed';
import { VirtualMachineContextLike } from '../../vmctx';
import { StatefulLike } from '../../stateful-like';
import { CreditAssets } from './credit-assets/credit-assets';
import { Margin, MarginFactory } from './margin';
import { Cost } from './credit-assets/cost';
import { CreditAssetsLike } from './credit-assets/credit-assets-like';
export declare abstract class MarginAssets<H extends HLike<H>> implements CreditAssetsLike<H>, StatefulLike<MarginAssets.Snapshot> {
    protected vmctx: VirtualMachineContextLike<H>;
    protected marketSpec: MarketSpec<H>;
    protected accountSpec: AccountSpec;
    protected assets: CreditAssets<H>;
    protected marginFactory: MarginFactory<H>;
    protected $margin: Margin<H>;
    constructor(vmctx: VirtualMachineContextLike<H>, marketSpec: MarketSpec<H>, accountSpec: AccountSpec, assets: CreditAssets<H>);
    open({ length, volume, dollarVolume, }: Executed<H>): void;
    close({ length, volume, dollarVolume, }: Executed<H>): H;
    abstract getFinalMargin(): H;
    abstract settle(length: Length, settlementPrice: H): H;
    abstract assertEnoughBalance(): void;
    capture(): MarginAssets.Snapshot;
    restore(snapshot: MarginAssets.Snapshot): void;
    getPosition(): Position<H>;
    getBalance(): H;
    getCost(): Cost<H>;
    pay(fee: H): void;
}
export declare namespace MarginAssets {
    interface Snapshot {
        creditAssets: CreditAssets.Snapshot;
        margin: Margin.Snapshot;
    }
}
