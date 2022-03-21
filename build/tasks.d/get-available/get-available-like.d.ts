import { HLike } from 'interfaces';
export interface GetAvailableLike<H extends HLike<H>> {
    getAvailable(): H;
}
