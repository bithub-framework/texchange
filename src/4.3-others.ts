import {
    Texchange as Parent,
    Events as ParentEvent,
} from './4.2-taken';
import {
    OpenOrder,
    clone,
    Length,
    Positions,
    Balances,
    Snapshot,
} from './interfaces';
import { EventEmitter } from 'events';
import Big from 'big.js';

class Texchange extends Parent {
    protected settle(): void {
        const position = clone(this.assets.position);
        for (const length of [Length.LONG, Length.SHORT] as const) {
            const settlementDollarVolume =
                this.config.calcDollarVolume(
                    this.settlementPrice,
                    position[length],
                ).round(this.config.CURRENCY_DP);
            this.assets.closePosition(
                length,
                position[length],
                settlementDollarVolume,
                new Big(0),
            );
            this.assets.openPosition(
                length,
                position[length],
                settlementDollarVolume,
                new Big(0),
            );
        }
    }

    /** @override */
    protected cancelOpenOrder(order: OpenOrder): OpenOrder {
        const filled = this.makers.get(order.id)?.filled || order.quantity;
        const toThaw = this.makers.removeOrder(order.id);
        if (toThaw) this.assets.thaw(toThaw);
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
        return clone({
            position: this.assets.position,
            closable: this.assets.closable,
            time: this.now(),
        });
    }

    public getBalances(): Balances {
        this.settle();
        return clone({
            balance: this.assets.balance,
            available: this.assets.available,
            time: this.now(),
        });
    }

    protected pushPositionsAndBalances(): void {
        this.settle();
        const positions: Positions = clone({
            position: this.assets.position,
            closable: this.assets.closable,
            time: this.now(),
        });
        const balances: Balances = clone({
            balance: this.assets.balance,
            available: this.assets.available,
            time: this.now(),
        });
        this.emit('positions', positions);
        this.emit('balances', balances);
    }
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

export {
    Texchange,
    Events,
}
