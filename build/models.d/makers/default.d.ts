import { TexchangeOpenOrder, HLike } from 'interfaces';
import { Frozen } from './frozon';
import { Context } from '../../context';
import { Makers } from './makers';
export declare class DefaultMakers<H extends HLike<H>> extends Makers<H> {
    protected readonly context: Context<H>;
    constructor(context: Context<H>);
    protected toFreeze(order: TexchangeOpenOrder<H>): Frozen<H>;
}
