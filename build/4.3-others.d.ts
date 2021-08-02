/// <reference types="node" />
import { Texchange as Parent, Events as ParentEvent } from './4.2-taken';
import { OpenOrder, Positions, Balances } from './interfaces';
import { EventEmitter } from 'events';
declare class Texchange extends Parent {
    protected settle(): void;
    /** @override */
    protected cancelOpenOrder(order: OpenOrder): OpenOrder;
    getPositions(): Positions;
    getBalances(): Balances;
    protected pushPositionsAndBalances(): void;
}
interface Events extends ParentEvent {
    positions: [Positions];
    balances: [Balances];
}
interface Texchange extends EventEmitter {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
export { Texchange, Events, };
