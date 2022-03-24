import { TexchangeOpenOrder, HLike } from 'interfaces';
import { Frozen } from './frozon';
import { Context } from '../../context/context';
import { Makers } from './makers';
export declare class DefaultMakers<H extends HLike<H>> extends Makers<H> {
    constructor(context: Context<H>);
    protected toFreeze(order: TexchangeOpenOrder<H>): Frozen<H>;
}
