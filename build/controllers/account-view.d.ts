/// <reference types="node" />
import { EventEmitter } from 'events';
import { Events, Closable } from '../interfaces';
import Big from 'big.js';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { type Stages } from '../scheduler';
export declare namespace AccountView {
    type Involved = keyof Pick<Models, 'assets' | 'makers' | 'margin'>;
}
import Involved = AccountView.Involved;
export declare class AccountView {
    protected context: Context;
    protected models: Pick<Models, Involved>;
    protected stages: Pick<Stages, Involved>;
    constructor(context: Context, models: Pick<Models, Involved>, stages: Pick<Stages, Involved>);
    static involved: Involved[];
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
