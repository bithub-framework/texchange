import { HLike } from 'interfaces';

import { StatefulLike } from '../stateful-like';

import { Assets } from '../models.d/assets';
import { Margins } from '../models.d/margins';
import { Makers } from '../models.d/makers/makers';
import { Pricing } from '../models.d/pricing/pricing';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';

import { Startable } from 'startable';
import { Latency } from '../views.d/latency';
import { Joystick } from '../views.d/joystick';

export interface TexchangeLike<
	H extends HLike<H>,
	PricingSnapshot,
	>
	extends StatefulLike<Snapshot<PricingSnapshot>> {

	readonly startable: Startable;
	readonly user: Latency<H>;
	readonly admin: Joystick<H>;
}

export interface Snapshot<PricingSnapshot> {
	readonly assets: Assets.Snapshot;
	readonly margins: Margins.Snapshot;
	readonly makers: Makers.Snapshot;
	readonly book: Book.Snapshot;
	readonly pricing: PricingSnapshot;
	readonly progress: Progress.Snapshot;
}
