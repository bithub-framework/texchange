/// <reference types="node" />
import { LimitOrder, Amendment, OpenOrder, Balances, Positions, Events, ApiLike } from '../interfaces';
import { EventEmitter } from 'events';
import { Context } from '../context';
import { Instant } from './instant';
export declare class Latency extends EventEmitter implements ApiLike {
    private context;
    private instant;
    constructor(context: Context, instant: Instant);
    makeOrders(orders: LimitOrder[]): Promise<(OpenOrder | Error)[]>;
    amendOrders(amendments: Amendment[]): Promise<(OpenOrder | Error)[]>;
    cancelOrders(orders: OpenOrder[]): Promise<OpenOrder[]>;
    getBalances(): Promise<Balances>;
    getPositions(): Promise<Positions>;
    getOpenOrders(): Promise<OpenOrder[]>;
}
export interface Latency {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
