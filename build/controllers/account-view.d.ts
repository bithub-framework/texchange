/// <reference types="node" />
import { EventEmitter } from 'events';
import { Events, Closable } from '../interfaces';
import Big from 'big.js';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { ModelLike } from '../models/model';
export declare namespace AccountView {
    type Involved = Pick<Models, 'assets' | 'makers' | 'margin'>;
}
import Involved = AccountView.Involved;
export declare class AccountView {
    protected context: Context;
    protected models: Involved;
    involved: ModelLike[];
    constructor(context: Context, models: Involved);
    getAvailable(): Big;
    getClosable(): Closable;
    protected finalMargin(): Big;
    protected finalFrozenBalance(): Big;
}
export interface Instant extends EventEmitter {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
