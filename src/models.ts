import { Assets } from './models/assets';
import { Margin } from './models/margin';
import { Makers } from './models/makers';
import { Book } from './models/book';
import { Progress } from './models/progress';
import { Pricing } from './models/pricing';


export interface Models {
	assets: Assets;
	margin: Margin;
	makers: Makers;
	book: Book;
	progress: Progress;
	pricing: Pricing<any>;
}
