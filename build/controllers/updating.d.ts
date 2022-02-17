/// <reference types="node" />
import { EventEmitter } from 'events';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { Taken } from './taken';
import { Orderbook, DatabaseTrade } from '../interfaces';
import { type Stages } from '../scheduler';
export declare type Involved = keyof Pick<Models, 'book' | 'progress' | 'pricing'> | Taken.Involved;
export declare class Updating extends EventEmitter {
    private context;
    private models;
    private stages;
    private taken;
    static involved: Involved[];
    constructor(context: Context, models: Pick<Models, Involved>, stages: Pick<Stages, Involved>, taken: Taken);
    updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
    updateOrderbook(orderbook: Readonly<Orderbook>): void;
}
declare type Events = {
    pushTrades: [readonly Readonly<DatabaseTrade>[]];
    pushOrderbook: [];
};
export interface Updating extends EventEmitter {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
export {};
