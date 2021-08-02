/// <reference types="node" />
import { Texchange as Parent, Events as ParentEvents } from './5.2-taken';
import { OpenOrder, Positions, Balances } from './interfaces';
import { EventEmitter } from 'events';
declare abstract class Texchange extends Parent {
    /** @override */
    protected cancelOpenOrder(order: OpenOrder): OpenOrder;
    getPositions(): Positions;
    getBalances(): Balances;
    protected pushPositionsAndBalances(): void;
}
interface Events extends ParentEvents {
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
