import { HLike, OpenOrder } from 'secretary-like';
import { Frozen } from '../../interfaces/frozen/frozen';
import { Makers } from './makers';
export declare class DefaultMakers<H extends HLike<H>> extends Makers<H> {
    protected toFreeze(order: OpenOrder<H>): Frozen<H>;
}
