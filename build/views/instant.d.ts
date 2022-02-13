/// <reference types="node" />
import { EventEmitter } from 'events';
import { Events, Trade, OpenOrder, LimitOrder, Amendment, Positions, Balances, Closable } from '../interfaces';
import Big from 'big.js';
import { type Hub } from '../hub';
interface Deps extends Pick<Hub, 'context' | 'models' | 'presenters'> {
}
export declare class Instant extends EventEmitter {
    private hub;
    constructor(hub: Deps);
    pushTrades(trades: readonly Readonly<Trade>[]): void;
    pushOrderbook(): void;
    makeOrders(orders: readonly Readonly<LimitOrder>[]): (OpenOrder | Error)[];
    private makeOpenOrder;
    cancelOrders(orders: readonly Readonly<OpenOrder>[]): OpenOrder[];
    private cancelOpenOrder;
    amendOrders(amendments: readonly Readonly<Amendment>[]): (OpenOrder | Error)[];
    getOpenOrders(): OpenOrder[];
    getPositions(): Positions;
    getBalances(): Balances;
    pushBalances(): void;
    pushPositions(): void;
    getAvailable(): Big;
    getClosable(): Closable;
}
export interface Instant extends EventEmitter {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
export {};
