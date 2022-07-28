import { HLike, Length } from 'secretary-like';
export interface Executed<H extends HLike<H>> {
    length: Length;
    volume: H;
    dollarVolume: H;
}
