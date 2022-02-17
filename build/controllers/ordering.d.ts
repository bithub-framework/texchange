/// <reference types="node" />
import { EventEmitter } from 'events';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { Validation } from './validation';
import { Taking } from './taking';
import { Making } from './making';
import { LimitOrder, OpenOrder, Amendment, Trade } from '../interfaces';
import { type Stages } from '../scheduler';
export declare type Involved = keyof Pick<Models, 'progress' | 'makers' | 'book'> | Taking.Involved | Making.Involved | Validation.Involved;
export declare class Ordering extends EventEmitter {
    private context;
    private models;
    private stages;
    private validation;
    private taking;
    private making;
    static involved: Involved[];
    constructor(context: Context, models: Pick<Models, Involved>, stages: Pick<Stages, Involved>, validation: Validation, taking: Taking, making: Making);
    makeOrder(order: Readonly<LimitOrder>): OpenOrder;
    private makeOpenOrder;
    cancelOrder(order: Readonly<OpenOrder>): OpenOrder;
    private cancelOpenOrder;
    amendOrder(amendment: Readonly<Amendment>): OpenOrder;
}
declare type Events = {
    pushTrades: [readonly Readonly<Trade>[]];
    pushOrderbook: [];
    pushPositions: [];
    pushBalances: [];
};
export interface Ordering extends EventEmitter {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
export {};
