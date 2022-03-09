import { Context } from '../context';
import { ModelsStatic } from './models-static';
import { Assets } from '../models.d/assets';
import { Margin } from '../models.d/margin';
import { Makers } from '../models.d/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing';
export declare class DefaultModels extends ModelsStatic {
    readonly assets: Assets;
    readonly margin: Margin;
    readonly makers: Makers;
    readonly book: Book;
    readonly progress: Progress;
    readonly pricing: Pricing<any>;
    constructor(context: Context);
}
