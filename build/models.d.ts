import { Assets } from './models.d/assets';
import { Margins } from './models.d/margins';
import { Makers } from './models.d/makers/makers';
import { Book } from './models.d/book';
import { Progress } from './models.d/progress';
import { Pricing } from './models.d/pricing/pricing';
import { HLike } from 'secretary-like';
import { Context } from './context';
export declare class Models<H extends HLike<H>> {
    makers: Makers<H>;
    pricing: Pricing<H, any>;
    assets: Assets<H>;
    margins: Margins<H>;
    book: Book<H>;
    progress: Progress<H>;
    constructor(context: Context<H>, makers: Makers<H>, pricing: Pricing<H, any>);
}
export declare namespace Models {
    interface Snapshot {
        assets: any;
        margins: any;
        makers: any;
        book: any;
        pricing: any;
        progress: any;
    }
}
