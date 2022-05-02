import { HLike } from 'interfaces';
import { inject } from 'injektor';
import { TYPES } from './types';

import { Models } from './models';

// Mark to market
import { Mtm } from './mark-to-market/mtm';

// Controller
import { Latency } from './facades.d/latency/latency';
import { Joystick } from './facades.d/joystick';


export class Texchange<H extends HLike<H>, PricingSnapshot>  {
	public constructor(
		@inject(TYPES.UserTex)
		public user: UserTex<H>,
		@inject(TYPES.AdminTex)
		public admin: AdminTex<H, PricingSnapshot>,
	) { }
}

export interface AdminTex<H extends HLike<H>, PricingSnapshot> extends Joystick<H, PricingSnapshot> { }
export interface UserTex<H extends HLike<H>> extends Latency<H> { }
