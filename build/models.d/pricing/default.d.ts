import { HLike, H, Trade } from 'secretary-like';
import { Pricing } from './pricing';
import { VirtualMachineContextLike } from '../../vmctx';
export declare class DefaultPricing<H extends HLike<H>> extends Pricing<H, DefaultPricing.Snapshot> {
    private vMCTX;
    private settlementPrice;
    constructor(vMCTX: VirtualMachineContextLike<H>, settlementPrice: H);
    updateTrades(trades: Trade<H>[]): void;
    getSettlementPrice(): H;
    capture(): DefaultPricing.Snapshot;
    restore(snapshot: DefaultPricing.Snapshot): void;
}
export declare namespace DefaultPricing {
    type Snapshot = H.Snapshot;
}
