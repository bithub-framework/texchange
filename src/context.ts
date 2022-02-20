import { Config } from './context.d/config';
import { Timeline } from './interfaces';
import { Broadcast } from './context.d/broadcast';

export interface Context {
	config: Config;
	timeline: Timeline;
	broadcast: Broadcast;
}
