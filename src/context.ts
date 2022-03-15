import { Config } from './context.d/config';
import { Timeline } from 'interfaces';
import {
	HStatic, HLike,
} from 'interfaces';


export interface Context<H extends HLike<H>> {
	readonly config: Config<H>;
	readonly timeline: Timeline;
	readonly H: HStatic<H>;
}
