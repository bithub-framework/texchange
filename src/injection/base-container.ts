import { HLike, HStatic } from 'secretary-like';
import { BaseContainer } from '@zimtsui/injektor';
import { TYPES } from './types';

// Context
import { Context } from '../context';
import { Config } from '../context.d/config';
import { TimelineLike } from 'secretary-like';
import { DataStatic } from '../interfaces/data';
import { MarketCalc } from 'secretary-like';

// Models
import { Models } from '../models';
import { Makers } from '../models.d/makers/makers';
import { Pricing } from '../models.d/pricing/pricing';

// Broadcast
import { Broadcast } from '../broadcast';

// Mtm
import { Mtm } from '../mark-to-market/mtm';

// Tasks
import { Tasks } from '../tasks/tasks';
import { UpdateTrades } from '../use-cases.d/update-trades';

// UseCases
import { UseCases } from '../use-cases';

// Facades
import { Facades } from '../facades';

// Texchange
import { Texchange } from '../texchange';
import { AdminTex } from '../texchange';
import { UserTex } from '../texchange';


export abstract class Container<H extends HLike<H>> extends BaseContainer {
	public constructor(
		private config: Config<H>,
		private timeline: TimelineLike,
		private H: HStatic<H>,
	) {
		super();
	}

	public [TYPES.Config] = this.rv<Config<H>>(this.config);
	public [TYPES.TimelineLike] = this.rv<TimelineLike>(this.timeline);
	public [TYPES.HStatic] = this.rv<HStatic<H>>(this.H);
	public abstract [TYPES.MarketCalc]: () => MarketCalc<H>;

	public [TYPES.DataStatic] = this.rcs<DataStatic<H>>(DataStatic);
	public [TYPES.Context] = this.rcs<Context<H>>(Context);

	public abstract [TYPES.Makers]: () => Makers<H>;
	public abstract [TYPES.Pricing]: () => Pricing<H, any>;
	public [TYPES.Models] = this.rcs<Models<H>>(Models);

	public abstract [TYPES.Mtm]: () => Mtm<H> | null;

	public [TYPES.Broadcast] = this.rcs<Broadcast<H>>(Broadcast);

	public abstract [TYPES.Tasks]: () => Tasks<H>;

	public abstract [TYPES.UpdateTrades]: () => UpdateTrades<H>;
	public [TYPES.UseCases] = this.rcs<UseCases<H>>(UseCases);

	public [TYPES.Facades] = this.rcs<Facades<H>>(Facades);
	public [TYPES.UserTex] = this.rfs<UserTex<H>>(() => this[TYPES.Facades]().latency);
	public [TYPES.AdminTex] = this.rfs<AdminTex<H>>(() => this[TYPES.Facades]().joystick);
	public [TYPES.Texchange] = this.rcs<Texchange<H>>(Texchange);
}
