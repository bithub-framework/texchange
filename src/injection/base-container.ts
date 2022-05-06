import { HLike, HStatic } from 'secretary-like';
import { Container } from 'injektor';
import { TYPES } from '../types';

// Context
import { Context } from '../context';
import { Config } from '../context.d/config';
import { TimelineLike } from 'timeline';
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


export function createBaseContainer<
	H extends HLike<H>,
	PricingSnapshot,
	>(
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

	c.rcs<Models<H, PricingSnapshot>>(
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

	c.rcs<Facades<H, PricingSnapshot>>(
		Facades,
		Facades,
	);

	c.rfs<UserTex<H>>(
		TYPES.UserTex,
		() => c.i<Facades<H, PricingSnapshot>>(Facades).latency,
	);
	c.rfs<AdminTex<H, PricingSnapshot>>(
		TYPES.AdminTex,
		() => c.i<Facades<H, PricingSnapshot>>(Facades).joystick,
	);

	c.rcs<Texchange<H, PricingSnapshot>>(
		Texchange,
		Texchange,
	);

	return c;
}
