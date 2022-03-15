/// <reference types="node" />
import { ConcreteLimitOrder, ConcreteAmendment, ConcreteOpenOrder, ConcreteBalances, ConcretePositions, ContextMarketApiLike, ContextAccountApiLike, MarketEvents, AccountEvents, HLike, ConcreteTradeId, ConcreteOrderId } from 'interfaces';
import { EventEmitter } from 'events';
import { Context } from '../context';
import { Instant } from './instant';
export declare class Latency<H extends HLike<H>> extends EventEmitter implements ContextMarketApiLike<H, ConcreteTradeId>, ContextAccountApiLike<H, ConcreteOrderId> {
    private context;
    private instant;
    constructor(context: Context<H>, instant: Instant<H>);
    makeOrders(orders: ConcreteLimitOrder<H>[]): Promise<(ConcreteOpenOrder<H> | Error)[]>;
    amendOrders(amendments: ConcreteAmendment<H>[]): Promise<(ConcreteOpenOrder<H> | Error)[]>;
    cancelOrders(orders: ConcreteOpenOrder<H>[]): Promise<ConcreteOpenOrder<H>[]>;
    getBalances(): Promise<ConcreteBalances<H>>;
    getPositions(): Promise<ConcretePositions<H>>;
    getOpenOrders(): Promise<ConcreteOpenOrder<H>[]>;
}
export declare type Events<H extends HLike<H>> = MarketEvents<H, ConcreteTradeId> & AccountEvents<H>;
export interface Latency<H extends HLike<H>> {
    on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}
