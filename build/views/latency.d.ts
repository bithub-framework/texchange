/// <reference types="node" />
import { LimitOrder, Amendment, OpenOrder, Balances, Positions, Events, ApiLike } from '../interfaces';
import { EventEmitter } from 'events';
import { type Hub } from '../hub';
interface Deps extends Pick<Hub, 'context' | 'models' | 'presenters'> {
    views: Pick<Hub['views'], 'instant'>;
}
export declare class Latency extends EventEmitter implements ApiLike {
    private hub;
    constructor(hub: Deps);
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
export {};
