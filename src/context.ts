import { Config } from './context/config';
import { Timeline } from 'interfaces';

export interface Context {
	config: Config;
	timeline: Timeline;
}
