/// <reference types="node" />
import { EventEmitter } from 'events';
import { Context } from '../context/context';
import { Scheduler } from '../scheduler';
import { Events, OpenOrder, LimitOrder, Amendment, Positions, Balances } from '../interfaces';
export declare class Instant extends EventEmitter {
    private context;
    private scheduler;
    constructor(context: Context, scheduler: Scheduler);
    private initializePushingTrades;
    private initializePushingOrderbook;
    makeOrders(orders: readonly Readonly<LimitOrder>[]): (OpenOrder | Error)[];
    cancelOrders(orders: readonly Readonly<OpenOrder>[]): OpenOrder[];
    amendOrders(amendments: readonly Readonly<Amendment>[]): (OpenOrder | Error)[];
    getOpenOrders(): OpenOrder[];
    getPositions(): Positions;
    getBalances(): Balances;
}
export interface Instant extends EventEmitter {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
