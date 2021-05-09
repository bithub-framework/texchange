/// <reference types="node" />
import { Texchange as Parent, Events as ParentEvent } from './4.2-taken';
import { OpenOrder, Positions, Balances, Snapshot } from './interfaces';
import { EventEmitter } from 'events';
declare abstract class Texchange extends Parent {
    protected settle(): void;
    /** @override */
    protected cancelOpenOrder(order: OpenOrder): OpenOrder;
    getPositions(): Promise<Positions>;
    getBalances(): Promise<Balances>;
    protected pushPositionsAndBalances(): Promise<void>;
    getSnapshot(): Snapshot;
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
