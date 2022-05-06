import { HLike, HStatic } from 'secretary-like';
import { Container } from 'injektor';
import { TYPES } from '../types';

// Context
import { Context } from '../context';
import { Config } from '../context.d/config';
import { TimelineLike } from 'secretary-like';
import { DataStatic } from '../interfaces/data';

// Models
import { Models } from '../models';

// Broadcast
import { Broadcast } from '../broadcast';

// UseCases
import { UseCases } from '../use-cases';

// Facades
import { Facades } from '../facades';

// Texchange
import { Texchange } from '../texchange';
import { AdminTex } from '../texchange';
import { UserTex } from '../texchange';


export function createBaseContainer<H extends HLike<H>>(
	config: Config<H>,
	timeline: TimelineLike,
	H: HStatic<H>,
): Container {
	const c = new Container();

	c.rfs<Context<H>>(
		Context,
		() => new Context(
			c.i(TYPES.MarketCalc),
			config,
			timeline,
			new DataStatic(H),
		),
	);

	c.rcs<Models<H>>(
		Models,
		Models,
	);

	c.rc<Broadcast<H>>(
		Broadcast,
		Broadcast,
	);

	c.rcs<UseCases<H>>(
		UseCases,
		UseCases,
	);

	c.rcs<Facades<H>>(
		Facades,
		Facades,
	);

	c.rfs<UserTex<H>>(
		TYPES.UserTex,
		() => c.i<Facades<H>>(Facades).latency,
	);
	c.rfs<AdminTex<H>>(
		TYPES.AdminTex,
		() => c.i<Facades<H>>(Facades).joystick,
	);

	c.rcs<Texchange<H>>(
		Texchange,
		Texchange,
	);

	return c;
}
