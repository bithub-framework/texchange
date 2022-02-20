/// <reference types="node" />
import { EventEmitter } from 'events';
import { Context } from '../context';
import { ValidateOrder } from './validate-order';
import { OrderTakes } from './order-takes';
import { OrderMakes } from './order-makes';
import { GetBalances } from './get-balances';
import { GetPositions } from './get-positions';
import { OpenOrder, Trade } from '../interfaces';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';
import { ControllerLike } from './controller';
declare type OwnInvolved = Pick<Models, 'book'>;
export declare namespace MakeOpenOrder {
    type Involved = OwnInvolved & OrderTakes.Involved & OrderMakes.Involved & ValidateOrder.Involved & GetBalances.Involved & GetPositions.Involved;
}
export declare class MakeOpenOrder extends EventEmitter implements ControllerLike {
    private context;
    private models;
    private validateOrder;
    private orderTakes;
    private orderMakes;
    private getBalances;
    private getPositions;
    involved: ModelLike[];
    constructor(context: Context, models: OwnInvolved, validateOrder: ValidateOrder, orderTakes: OrderTakes, orderMakes: OrderMakes, getBalances: GetBalances, getPositions: GetPositions);
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
