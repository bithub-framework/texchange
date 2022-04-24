import { HLike, HStatic } from 'interfaces';
import { Container } from 'injektor';
import { Config } from '../context.d/config';
import { Timeline } from 'interfaces';
export declare function createDefaultContainer<H extends HLike<H>>(config: Config<H>, timeline: Timeline, H: HStatic<H>): Container;
