import { HLike, HStatic } from 'interfaces';
import { Container } from 'injektor';
import { Config } from '../context.d/config';
import { TimelineLike } from 'interfaces';
export declare function createBaseContainer<H extends HLike<H>, PricingSnapshot>(config: Config<H>, timeline: TimelineLike, H: HStatic<H>): Container;
