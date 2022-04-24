import { HLike, HStatic } from 'interfaces';
import { Container } from 'injektor';
import { TYPES } from '../types';

// Context
import { Context } from '../context';
import { Config } from '../context.d/config';
import { Timeline } from 'interfaces';

// Models
import { Models } from '../models';

// Broadcast
import { Broadcast } from '../broadcast';

// UseCases
import { UseCases } from '../use-cases';

// Facades
import { Facades } from '../facades';

// Controller
import { Latency } from '../facades.d/latency';
import { Joystick } from '../facades.d/joystick';

// Texchange
import { Texchange } from '../texchange';


export function createBaseContainer<
	H extends HLike<H>,
	PricingSnapshot,
	>(
		config: Config<H>,
		timeline: Timeline,
		H: HStatic<H>,
): Container {
	const c = new Container();

	c.rfs<Context<H>>(
		Context,
		() => new Context(
			c.i(TYPES.MarketCalc),
			config,
			timeline,
			H,
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

	c.rcs<Facades<H>>(
		Facades,
		Facades,
	);

	c.rfs<Latency<H>>(
		TYPES.User,
		() => c.i<Facades<H>>(Facades).latency,
	);
	c.rfs<Joystick<H>>(
		TYPES.Admin,
		() => c.i<Facades<H>>(Facades).joystick,
	);

	c.rcs<Texchange<H, PricingSnapshot>>(
		Texchange,
		Texchange,
	);

	return c;
}
