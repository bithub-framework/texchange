/// <reference types="node" />
import { EventEmitter } from 'events';
import { Context } from '../context/context';
import { Validation } from './validation';
import { Taking } from './taking';
import { Making } from './making';
import { OpenOrder, Trade } from '../interfaces';
import { ModelLike } from '../models/model';
declare type Involved = Taking.Involved & Making.Involved & Validation.Involved;
export declare class MakeOpenOrder extends EventEmitter {
    private context;
    private models;
    private validation;
    private taking;
    private making;
    involved: ModelLike[];
    constructor(context: Context, models: Involved, validation: Validation, taking: Taking, making: Making);
    makeOpenOrder(order: OpenOrder): OpenOrder;
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
