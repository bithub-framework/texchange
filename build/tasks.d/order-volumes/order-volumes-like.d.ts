import { Length, HLike } from 'interfaces';
export interface OrderVolumesLike<H extends HLike<H>> {
    open(volumes: OrderVolumesLike.Volumes<H>): void;
    close(volumes: OrderVolumesLike.Volumes<H>): void;
}
export declare namespace OrderVolumesLike {
    interface Volumes<H extends HLike<H>> {
        length: Length;
        volume: H;
        dollarVolume: H;
    }
}
