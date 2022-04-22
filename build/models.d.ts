import { Assets } from './models.d/assets';
import { Margins } from './models.d/margins';
import { Makers } from './models.d/makers/makers';
import { Book } from './models.d/book';
import { Progress } from './models.d/progress';
import { Pricing } from './models.d/pricing/pricing';
import { HLike } from 'interfaces';
import { Context } from './context';
export declare class Models<H extends HLike<H>, PricingSnapshot> {
    assets: Assets<H>;
    margins: Margins<H>;
    makers: Makers<H>;
    book: Book<H>;
    progress: Progress<H>;
    pricing: Pricing<H, PricingSnapshot>;
    constructor(context: Context<H>);
}
