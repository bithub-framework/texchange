import { Assets } from '../models.d/margin-assets/assets';
import { MarginAssets } from '../models.d/margin-assets/margin-assets';
import { Makers } from '../models.d/makers/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing/pricing';
import { HLike } from 'secretary-like';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class Models<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.MODELS.makers)
		public makers: Makers<H>,
		@inject(TYPES.MODELS.pricing)
		public pricing: Pricing<H, any>,
		@inject(TYPES.MODELS.assets)
		public assets: Assets<H>,
		@inject(TYPES.MODELS.margins)
		public margins: MarginAssets<H>,
		@inject(TYPES.MODELS.book)
		public book: Book<H>,
		@inject(TYPES.MODELS.progress)
		public progress: Progress<H>,
	) { }
}

export namespace Models {
	export interface Snapshot {
		assets: any;
		margins: any;
		makers: any;
		book: any;
		pricing: any;
		progress: any;
	}
}
