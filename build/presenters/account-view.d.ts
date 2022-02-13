/// <reference types="node" />
import { EventEmitter } from 'events';
import { Events, Closable } from '../interfaces';
import Big from 'big.js';
import { type Hub } from '../hub';
interface Deps extends Pick<Hub, 'context' | 'models'> {
}
export declare class AccountView {
    private hub;
    constructor(hub: Deps);
    getAvailable(): Big;
    getClosable(): Closable;
}
export interface Instant extends EventEmitter {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
export {};
