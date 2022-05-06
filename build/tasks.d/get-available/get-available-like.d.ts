import { HLike } from 'secretary-like';
export interface GetAvailableLike<H extends HLike<H>> {
    getAvailable(): H;
}
