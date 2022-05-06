import {
	Length,
	HLike,
} from 'secretary-like';


export interface MarginAccumulationLike<H extends HLike<H>> {
	newMarginAfterOpening(volumes: MarginAccumulationLike.Volumes<H>): H;
	newMarginAfterClosing(volumes: MarginAccumulationLike.Volumes<H>): H;
}

export namespace MarginAccumulationLike {
	export interface Volumes<H extends HLike<H>> {
		length: Length;
		volume: H;
		dollarVolume: H;
	}
}
