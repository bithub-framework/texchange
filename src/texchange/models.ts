import { Assets } from '../models.d/assets';
import { Margins } from '../models.d/margins';
import { Makers } from '../models.d/makers/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing/pricing';
import { HLike } from 'secretary-like';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class Models<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.MODELS.Makers)
		public makers: Makers<H>,
		@inject(TYPES.MODELS.Pricing)
		public pricing: Pricing<H, any>,
		@inject(TYPES.MODELS.Assets)
		public assets: Assets<H>,
		@inject(TYPES.MODELS.Margins)
		public margins: Margins<H>,
		@inject(TYPES.MODELS.Book)
		public book: Book<H>,
		@inject(TYPES.MODELS.Progress)
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
