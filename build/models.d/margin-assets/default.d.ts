import { MarginAssets } from './margin-assets';
import { HLike, Length } from 'secretary-like';
export declare class DefaultMarginAssets<H extends HLike<H>> extends MarginAssets<H> {
    settle(length: Length, settlementPrice: H): H;
    getFinalMargin(): H;
    assertEnoughBalance(): void;
}
