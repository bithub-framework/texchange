import { HLike, OpenOrder } from 'secretary-like';
import { Frozen } from '../../data-types/frozen';
import { Makers } from './makers';
export declare class DefaultMakers<H extends HLike<H>> extends Makers<H> {
    protected unroundedToFreeze(order: OpenOrder<H>): Frozen<H>;
}
