/// <reference types="node" />
import { EventEmitter } from 'events';
import { Context } from '../context';
import { ConcreteOpenOrder, ConcreteLimitOrder, ConcreteAmendment, ConcretePositions, ConcreteBalances, ConcreteTradeId, MarketEvents, AccountEvents } from 'interfaces';
import { UseCasesLike } from '../use-cases';
import { HLike } from 'interfaces';
export declare class Instant<H extends HLike<H>> extends EventEmitter {
    private context;
    private useCases;
    constructor(context: Context<H>, useCases: UseCasesLike<H>);
    makeOrders(orders: readonly ConcreteLimitOrder<H>[]): (ConcreteOpenOrder<H> | Error)[];
    cancelOrders(orders: readonly ConcreteOpenOrder<H>[]): ConcreteOpenOrder<H>[];
    amendOrders(amendments: readonly ConcreteAmendment<H>[]): (ConcreteOpenOrder<H> | Error)[];
    getOpenOrders(): ConcreteOpenOrder<H>[];
    getPositions(): ConcretePositions<H>;
    getBalances(): ConcreteBalances<H>;
}
export declare type Events<H extends HLike<H>> = MarketEvents<H, ConcreteTradeId> & AccountEvents<H>;
export interface Instant<H extends HLike<H>> extends EventEmitter {
    on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}
