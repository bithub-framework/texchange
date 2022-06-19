import { HLike, OpenOrder, MarketSpec } from 'secretary-like';
import { Frozen } from '../../interfaces/frozen';
import { Context } from '../../context';
import { Makers } from './makers';
export declare class DefaultMakers<H extends HLike<H>> extends Makers<H> {
    protected context: Context<H>;
    protected marketSpec: MarketSpec<H>;
    constructor(context: Context<H>, marketSpec: MarketSpec<H>);
    /**
     * 默认单向持仓模式
     */
    protected toFreeze(order: OpenOrder<H>): Frozen<H>;
}
