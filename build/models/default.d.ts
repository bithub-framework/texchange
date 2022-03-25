import { Context } from '../context/context';
import { Models } from './models';
import { Makers } from '../models.d/makers/makers';
import { Pricing } from '../models.d/pricing/pricing';
import { HLike } from 'interfaces';
export declare class DefaultModels<H extends HLike<H>> extends Models<H> {
    makers: Makers<H>;
    pricing: Pricing<H, any>;
    constructor(context: Context<H>);
}
