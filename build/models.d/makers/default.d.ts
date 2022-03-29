import { TexchangeOpenOrder, HLike } from 'interfaces';
import { Frozen } from './frozon';
import { Context } from '../../context';
import { Makers } from './makers';
export declare class DefaultMakers<H extends HLike<H>> extends Makers<H> {
    constructor(context: Context<H>);
    /**
     * 默认单向持仓模式
     */
    protected toFreeze(order: TexchangeOpenOrder<H>): Frozen<H>;
}
