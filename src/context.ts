import { Config } from './context.d/config';
import { Timeline } from 'interfaces';

export interface Context {
	config: Config;
	timeline: Timeline;
}
