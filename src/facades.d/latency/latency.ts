import {
    MarketEvents,
    AccountEvents,
    MarketSpec,
    AccountSpec,
    HLike,
    TradeId,
    OrderId,
} from 'interfaces';
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

export interface MarketAccountSpec<H extends HLike<H>> extends
    MarketSpec<H>,
    AccountSpec { }

export interface MarketAccountEvents<H extends HLike<H>> extends
    MarketEvents<H>,
    AccountEvents<H> { }

export interface MarketAccountEventEmitterLike<H extends HLike<H>> extends NodeJS.EventEmitter {
    on<Event extends keyof MarketAccountEvents<H>>(event: Event, listener: (...args: MarketAccountEvents<H>[Event]) => void): this;
    once<Event extends keyof MarketAccountEvents<H>>(event: Event, listener: (...args: MarketAccountEvents<H>[Event]) => void): this;
    off<Event extends keyof MarketAccountEvents<H>>(event: Event, listener: (...args: MarketAccountEvents<H>[Event]) => void): this;
    emit<Event extends keyof MarketAccountEvents<H>>(event: Event, ...args: MarketAccountEvents<H>[Event]): boolean;
}
