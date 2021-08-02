import {
    Texchange as Parent,
    Events as ParentEvents,
} from './5-margin.2-taken';
import {
    OpenOrder,
    clone,
    Positions,
    Balances,
    Length,
} from './interfaces';
import { EventEmitter } from 'events';
import Big from 'big.js';


abstract class Texchange extends Parent {

    /** @override */
    protected clear(): void {
        const position = clone(this.equity.position);
        for (const length of [Length.LONG, Length.SHORT] as const) {
            const clearingDollarVolume =
                this.config.calcDollarVolume(
                    this.clearingPrice,
                    position[length],
                ).round(this.config.CURRENCY_DP);
            this.equity.closePosition(
                length,
                position[length],
                clearingDollarVolume,
                new Big(0),
            );
            this.equity.openPosition(
                length,
                position[length],
                clearingDollarVolume,
                new Big(0),
            );
        }
        this.margin.setPositionMargin(
            this.config.calcPositionMarginOnceClearing({
                spec: this.config,
                cost: this.equity.cost,
                position: this.equity.position,
                clearingPrice: this.clearingPrice,
                latestPrice: this.latestPrice,
                positionMargin: this.margin.positionMargin,
            })
        );
    }

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
        this.clear();
        const positions = {
            position: this.equity.position,
            closable: this.margin.closable,
            time: this.now(),
        };
        return clone(positions);
    }

    public getBalances(): Balances {
        this.clear();
        const balances = {
            balance: this.equity.balance,
            available: this.margin.available,
            time: this.now(),
        };
        return clone(balances);
    }

    protected pushPositionsAndBalances(): void {
        this.clear();
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
