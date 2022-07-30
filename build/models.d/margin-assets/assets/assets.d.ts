import { Length, Position, HLike, H, MarketSpec } from 'secretary-like';
import { Cost } from './cost';
import { VirtualMachineContextLike } from '../../../vmctx';
import { StatefulLike } from '../../../stateful-like';
import { Executed } from '../../../data-types/executed';
export declare class Assets<H extends HLike<H>> implements StatefulLike<Assets.Snapshot> {
    protected vMCTX: VirtualMachineContextLike<H>;
    protected marketSpec: MarketSpec<H>;
    protected balance: H;
    private Cost;
    private $position;
    private $cost;
    constructor(vMCTX: VirtualMachineContextLike<H>, marketSpec: MarketSpec<H>, balance: H);
    getBalance(): H;
    getPosition(): Position<H>;
    getCost(): Cost<H>;
    capture(): Assets.Snapshot;
    restore(snapshot: Assets.Snapshot): void;
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
export declare namespace Assets {
    interface Snapshot {
        position: Position.Snapshot;
        balance: H.Snapshot;
        cost: Cost.Snapshot;
    }
}
