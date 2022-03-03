import { Assets } from './models.d/assets';
import { Margin } from './models.d/margin';
import { Makers } from './models.d/makers';
import { Book } from './models.d/book';
import { Progress } from './models.d/progress';
import { Pricing } from './models.d/pricing';


export interface Models {
	assets: Assets;
	margin: Margin;
	makers: Makers;
	book: Book;
	progress: Progress;
	pricing: Pricing<any>;
}
