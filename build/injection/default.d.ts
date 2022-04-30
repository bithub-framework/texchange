import { HLike, HStatic } from 'interfaces';
import { Container } from 'injektor';
import { Config } from '../context.d/config';
import { TimelineLike } from 'interfaces';
export declare function createDefaultContainer<H extends HLike<H>>(config: Config<H>, timeline: TimelineLike, H: HStatic<H>): Container;
