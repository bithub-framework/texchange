import {
    Texchange as Parent,
    Events as ParentEvents,
} from './5-margin.2-taken';
import {
    OpenOrder,
    clone,
    Positions,
    Balances,
} from './interfaces';
import { EventEmitter } from 'events';

abstract class Texchange extends Parent {

    /** @override */
    protected cancelOpenOrder(order: OpenOrder): OpenOrder {
        const filled = this.makers.get(order.id)?.filled || order.quantity;
        const toThaw = this.makers.removeOrder(order.id);
        if (toThaw) this.margin.thaw(toThaw);
        return {
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: order.id,
            filled,
            unfilled: order.quantity.minus(filled),
        };
    }

    public getPositions(): Positions {
        this.settle();
        const positions = {
            position: this.equity.position,
            closable: this.margin.closable,
            time: this.now(),
        };
        return clone(positions);
    }

    public getBalances(): Balances {
        this.settle();
        const balances = {
            balance: this.equity.balance,
            available: this.margin.available,
            time: this.now(),
        };
        return clone(balances);
    }

    protected pushPositionsAndBalances(): void {
        this.settle();
        const positions: Positions = {
            position: this.equity.position,
            closable: this.margin.closable,
            time: this.now(),
        };
        const balances: Balances = {
            balance: this.equity.balance,
            available: this.margin.available,
            time: this.now(),
        };
        this.emit('positions', clone(positions));
        this.emit('balances', clone(balances));
    }
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

export {
    Texchange,
    Events,
}
