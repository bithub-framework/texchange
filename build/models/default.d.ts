import { Context } from '../context';
import { StatefulModels } from './stateful-models';
import { Assets } from '../models.d/assets';
import { Margins } from '../models.d/margins';
import { Makers } from '../models.d/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing';
import { HLike } from 'interfaces';
export declare class DefaultModels<H extends HLike<H>> extends StatefulModels<H> {
    protected readonly context: Context<H>;
    readonly assets: Assets<H>;
    readonly margins: Margins<H>;
    readonly makers: Makers<H>;
    readonly book: Book<H>;
    readonly progress: Progress<H>;
    readonly pricing: Pricing<H, any>;
    constructor(context: Context<H>);
}
