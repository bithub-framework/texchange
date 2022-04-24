import { HLike } from 'interfaces';
import { OpenOrder, Frozen } from '../../interfaces';
import { Context } from '../../context';
import { Makers } from './makers';
export declare class DefaultMakers<H extends HLike<H>> extends Makers<H> {
    constructor(context: Context<H>);
    /**
     * 默认单向持仓模式
     */
    protected toFreeze(order: OpenOrder<H>): Frozen<H>;
}
