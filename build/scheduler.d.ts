/// <reference types="node" />
import { EventEmitter } from 'events';
import { Context } from './context/context';
import { Models } from './models/models';
import { Mtm } from './controllers/mtm';
import { Clearing } from './controllers/clearing';
import { LimitOrder, OpenOrder, Amendment, DatabaseTrade, Orderbook, Trade, Positions, Balances } from './interfaces';
export declare type Stages = {
    [model in keyof Models]: boolean;
};
export declare class Scheduler extends EventEmitter {
    private context;
    private models;
    protected mtm: Mtm;
    protected clearing: Clearing;
    private making;
    private taking;
    private taken;
    private accountView;
    private validation;
    private ordering;
    private updating;
    private initialStages;
    private readonly stages;
    constructor(context: Context, models: Models);
    private initializeStages;
    makeOrder(order: Readonly<LimitOrder>): OpenOrder;
    cancelOrder(order: Readonly<OpenOrder>): OpenOrder;
    amendOrder(amendment: Readonly<Amendment>): OpenOrder;
    getOpenOrders(): OpenOrder[];
    getPositions(): Positions;
    getBalances(): Balances;
    updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
    updateOrderbook(orderbook: Readonly<Orderbook>): void;
}
declare type Events = {
    pushTrades: [readonly Readonly<Trade>[]];
    pushOrderbook: [Readonly<Orderbook>];
    pushPositions: [Readonly<Positions>];
    pushBalances: [Readonly<Balances>];
};
export interface Scheduler extends EventEmitter {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
export {};
