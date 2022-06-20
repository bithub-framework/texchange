import { HLike, OpenOrder } from 'secretary-like';
import { Frozen } from '../../interfaces/frozen';
import { Makers } from './makers';
export declare class DefaultMakers<H extends HLike<H>> extends Makers<H> {
    /**
     * 默认单向持仓模式
     */
    protected toFreeze(order: OpenOrder<H>): Frozen<H>;
}
