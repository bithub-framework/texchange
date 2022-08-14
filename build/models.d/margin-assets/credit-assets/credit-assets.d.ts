import { Length, Position, HLike, H, MarketSpec } from 'secretary-like';
import { Cost } from './cost';
import { VirtualMachineContextLike } from '../../../vmctx';
import { StatefulLike } from '../../../stateful-like';
import { Executed } from '../../../data-types/executed';
import { CreditAssetsLike } from './credit-assets-like';
export declare class CreditAssets<H extends HLike<H>> implements CreditAssetsLike<H>, StatefulLike<CreditAssets.Snapshot> {
    private vmctx;
    private marketSpec;
    private balance;
    private Cost;
    private $position;
    private $cost;
    constructor(vmctx: VirtualMachineContextLike<H>, marketSpec: MarketSpec<H>, balance: H);
    getBalance(): H;
    getPosition(): Position<H>;
    getCost(): Cost<H>;
    capture(): CreditAssets.Snapshot;
    restore(snapshot: CreditAssets.Snapshot): void;
    pay(fee: H): void;
    open({ length, volume, dollarVolume, }: Executed<H>): void;
    /**
     *
     * @returns Profit
     */
    close({ length, volume, dollarVolume, }: Executed<H>): H;
    /**
     * @returns Profit
     */
    settle(length: Length, settlementPrice: H): H;
}
export declare namespace CreditAssets {
    interface Snapshot {
        position: Position.Snapshot;
        balance: H.Snapshot;
        cost: Cost.Snapshot;
    }
}
