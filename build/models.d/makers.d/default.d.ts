import { OpenOrder } from 'interfaces';
import { Frozen } from './frozon';
import { Context } from '../../context';
import { Makers } from '../makers';
export declare class DefaultMakers extends Makers {
    protected readonly context: Context;
    constructor(context: Context);
    protected toFreeze(order: OpenOrder): Frozen;
}
