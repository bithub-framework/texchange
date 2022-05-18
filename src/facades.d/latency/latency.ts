import {
    MarketEvents,
    AccountEvents,
    MarketSpec,
    AccountSpec,
    HLike,
} from 'secretary-like';
import { Context } from '../../context';
import { Instant } from '../instant';

import { MarketLatency } from './market';
import { AccountLatency } from './account';



export class Latency<H extends HLike<H>> {
    public market: MarketLatency<H>;
    public account: AccountLatency<H>;

    public constructor(
        context: Context<H>,
        useCases: Latency.UseCaseDeps<H>,
        instant: Instant<H>,
    ) {
        this.market = new MarketLatency(
            context,
            useCases,
        );
        this.account = new AccountLatency(
            context,
            useCases,
            instant,
        );
    }
}

export namespace Latency {
    export interface UseCaseDeps<H extends HLike<H>>
        extends MarketLatency.UseCaseDeps<H>,
        AccountLatency.UseCaseDeps<H> { }
}
