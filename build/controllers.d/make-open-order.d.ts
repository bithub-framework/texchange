/// <reference types="node" />
import { EventEmitter } from 'events';
import { Context } from '../context';
import { ValidateOrder } from './validate-order';
import { OrderTakes } from './order-takes';
import { OrderMakes } from './order-makes';
import { OpenOrder, Trade } from '../interfaces';
import { ModelLike } from '../models.d/model';
declare type Involved = OrderTakes.Involved & OrderMakes.Involved & ValidateOrder.Involved;
export declare class MakeOpenOrder extends EventEmitter {
    private context;
    private models;
    private validation;
    private taking;
    private making;
    involved: ModelLike[];
    constructor(context: Context, models: Involved, validation: ValidateOrder, taking: OrderTakes, making: OrderMakes);
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
