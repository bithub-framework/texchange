/// <reference types="node" />
import { EventEmitter } from 'events';
import { Events, Trade, OpenOrder, LimitOrder, Amendment, Positions, Balances } from '../interfaces';
import { Core } from '../core';
export declare class InterfaceInstant extends EventEmitter {
    private core;
    constructor(core: Core);
    pushTrades(trades: Trade[]): void;
    pushOrderbook(): void;
    pushPositionsAndBalances(): void;
    makeOrders(orders: LimitOrder[]): (OpenOrder | Error)[];
    cancelOrders(orders: OpenOrder[]): OpenOrder[];
    amendOrders(amendments: Amendment[]): (OpenOrder | Error)[];
    getOpenOrders(): OpenOrder[];
    getPositions(): Positions;
    getBalances(): Balances;
}
export interface InterfaceInstant {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}