/// <reference types="node" />
import { EventEmitter } from 'events';
import { Events, Trade, OpenOrder, LimitOrder, Amendment, Positions, Balances, Closable } from '../interfaces';
import Big from 'big.js';
import { type Hub } from '../hub';
export declare class Instant extends EventEmitter {
    private hub;
    constructor(hub: Hub);
    pushTrades(trades: Trade[]): void;
    pushOrderbook(): void;
    makeOrders(orders: LimitOrder[]): (OpenOrder | Error)[];
    /**
     * @returns As duplicate.
     */
    private makeOpenOrder;
    cancelOrders(orders: OpenOrder[]): OpenOrder[];
    /**
     * @returns As duplicate.
     */
    private cancelOpenOrder;
    amendOrders(amendments: Amendment[]): (OpenOrder | Error)[];
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