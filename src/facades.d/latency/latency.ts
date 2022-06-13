import {
    MarketEvents,
    AccountEvents,
    MarketSpec,
    AccountSpec,
    HLike,
} from 'secretary-like';

import { Context } from '../../context';
import { Instant } from '../instant';
import { Config } from './config';

import { MarketLatency } from './market';
import { AccountLatency } from './account';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';



export class Latency<H extends HLike<H>> {
    public market: MarketLatency<H>;
    public account: AccountLatency<H>;

    public constructor(
        @inject(TYPES.Context)
        context: Context<H>,
        @inject(TYPES.UseCases)
        useCases: Latency.UseCaseDeps<H>,
        @inject(TYPES.Instant)
        instant: Instant<H>,
        @inject(TYPES.DelayConfig)
        config: Config,
    ) {
        this.market = new MarketLatency(
            context,
            useCases,
            config
        );
        this.account = new AccountLatency(
            context,
            useCases,
            instant,
            config,
        );
    }
}

export namespace Latency {
    export interface UseCaseDeps<H extends HLike<H>>
        extends MarketLatency.UseCaseDeps<H>,
        AccountLatency.UseCaseDeps<H> { }
}
