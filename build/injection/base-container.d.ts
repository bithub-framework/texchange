import { HLike, HStatic } from 'secretary-like';
import { Container } from 'injektor';
import { Config } from '../context.d/config';
import { TimelineLike } from 'secretary-like';
export declare function createBaseContainer<H extends HLike<H>, PricingSnapshot>(config: Config<H>, timeline: TimelineLike, H: HStatic<H>): Container;
