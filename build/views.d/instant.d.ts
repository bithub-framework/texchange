/// <reference types="node" />
import { EventEmitter } from 'events';
import { Context } from '../context';
import { OpenOrder, LimitOrder, Amendment, Positions, Balances, MarketEvents, AccountEvents } from 'interfaces';
import { UseCases } from '../use-cases';
export declare class Instant extends EventEmitter {
    private context;
    private useCases;
    constructor(context: Context, useCases: UseCases);
    makeOrders(orders: readonly Readonly<LimitOrder>[]): (OpenOrder | Error)[];
    cancelOrders(orders: readonly Readonly<OpenOrder>[]): OpenOrder[];
    amendOrders(amendments: readonly Readonly<Amendment>[]): (OpenOrder | Error)[];
    getOpenOrders(): OpenOrder[];
    getPositions(): Positions;
    getBalances(): Balances;
}
export declare type Events = MarketEvents & AccountEvents;
export interface Instant extends EventEmitter {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
