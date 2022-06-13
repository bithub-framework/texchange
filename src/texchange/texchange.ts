import { HLike } from 'secretary-like';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


// Facades
import { Latency } from '../facades.d/latency/latency';
import { Joystick } from '../facades.d/joystick';


export class Texchange<H extends HLike<H>>  {
	public constructor(
		@inject(TYPES.UserTex)
		public user: UserTex<H>,
		@inject(TYPES.AdminTex)
		public admin: AdminTex<H>,
	) { }
}

export interface AdminTex<H extends HLike<H>> extends Joystick<H> { }
export interface UserTex<H extends HLike<H>> extends Latency<H> { }
