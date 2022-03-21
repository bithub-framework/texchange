import { Length, HLike } from 'interfaces';
export interface MarginAccumulationLike<H extends HLike<H>> {
    newMarginAfterOpening(volumes: MarginAccumulationLike.Volumes<H>): H;
    newMarginAfterClosing(volumes: MarginAccumulationLike.Volumes<H>): H;
}
export declare namespace MarginAccumulationLike {
    interface Volumes<H extends HLike<H>> {
        length: Length;
        volume: H;
        dollarVolume: H;
    }
}
