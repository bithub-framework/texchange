/// <reference types="node" />
import { MarketEvents, AccountEvents, MarketSpec, AccountSpec, HLike } from 'secretary-like';
import { Context } from '../../context';
import { Instant } from '../instant';
import { MarketLatency } from './market';
import { AccountLatency } from './account';
export declare class Latency<H extends HLike<H>> {
    market: MarketLatency<H>;
    account: AccountLatency<H>;
    constructor(context: Context<H>, useCases: Latency.UseCaseDeps<H>, instant: Instant<H>);
}
export declare namespace Latency {
    interface UseCaseDeps<H extends HLike<H>> extends MarketLatency.UseCaseDeps<H>, AccountLatency.UseCaseDeps<H> {
    }
}
export interface MarketAccountSpec<H extends HLike<H>> extends MarketSpec<H>, AccountSpec {
}
export interface MarketAccountEvents<H extends HLike<H>> extends MarketEvents<H>, AccountEvents<H> {
}
export interface MarketAccountEventEmitterLike<H extends HLike<H>> extends NodeJS.EventEmitter {
    on<Event extends keyof MarketAccountEvents<H>>(event: Event, listener: (...args: MarketAccountEvents<H>[Event]) => void): this;
    once<Event extends keyof MarketAccountEvents<H>>(event: Event, listener: (...args: MarketAccountEvents<H>[Event]) => void): this;
    off<Event extends keyof MarketAccountEvents<H>>(event: Event, listener: (...args: MarketAccountEvents<H>[Event]) => void): this;
    emit<Event extends keyof MarketAccountEvents<H>>(event: Event, ...args: MarketAccountEvents<H>[Event]): boolean;
}
