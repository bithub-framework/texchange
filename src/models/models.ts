import { Assets } from './assets';
import { Margin } from './margin';
import { Makers } from './makers';
import { Book } from './book';
import { Progress } from './progress';
import { Pricing } from './pricing';


export interface Models {
	assets: Assets;
	margin: Margin;
	makers: Makers;
	book: Book;
	progress: Progress;
	pricing: Pricing<any>;
}
