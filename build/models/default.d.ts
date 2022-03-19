import { Context } from '../context';
import { Models } from './models';
import { Makers } from '../models.d/makers';
import { Pricing } from '../models.d/pricing';
import { HLike } from 'interfaces';
export declare class DefaultModels<H extends HLike<H>> extends Models<H> {
    readonly makers: Makers<H>;
    readonly pricing: Pricing<H, any>;
    constructor(context: Context<H>);
}
