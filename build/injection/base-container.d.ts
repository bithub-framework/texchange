import { HLike, HStatic } from 'interfaces';
import { Container } from 'injektor';
import { Config } from '../context.d/config';
import { Timeline } from 'interfaces';
export declare function createBaseContainer<H extends HLike<H>, PricingSnapshot>(config: Config<H>, timeline: Timeline, H: HStatic<H>): Container;
