/// <reference types="node" />
import { Core as Parent, Events as ParentEvents } from './5-margin.2-taken';
import { OpenOrder, Positions, Balances } from './interfaces';
import { EventEmitter } from 'events';
declare abstract class Core extends Parent {
    /** @override */
    protected settle(): void;
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
interface Core extends EventEmitter {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
export { Core, Events, };
