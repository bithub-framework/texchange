import { EventEmitter } from 'events';
import {
    Events,
    Trade,
    OpenOrder,
    LimitOrder,
    Amendment,
    clone,
    Positions,
    Balances,
} from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';


export class InterfaceInstant extends EventEmitter {
    constructor(
        private core: Core,
    ) {
        super();
    }

    public pushTrades(trades: Trade[]): void {
        this.emit('trades', clone(trades));
    }


    public pushOrderbook(): void {
        this.emit('orderbook', clone(this.core.states.orderbook.getBook()));
    }


    public pushPositionsAndBalances(): void {
        // this.clearingController.clear();
        const positions: Positions = {
            position: this.core.states.assets.position,
            closable: this.core.states.margin.closable,
            time: this.core.timeline.now(),
        };
        const balances: Balances = {
            balance: this.core.states.assets.balance,
            available: this.core.states.margin.available,
            time: this.core.timeline.now(),
        };
        this.emit('positions', clone(positions));
        this.emit('balances', clone(balances));
    }


    public makeOrders(orders: LimitOrder[]): (OpenOrder | Error)[] {
        return orders.map((order): OpenOrder | Error => {
            try {
                const openOrder: OpenOrder = {
                    ...order,
                    id: ++this.core.states.misc.userOrderCount,
                    filled: new Big(0),
                    unfilled: order.quantity,
                };
                this.core.validation.validateOrder(openOrder);
                return clone(this.core.ordering.makeOpenOrder(openOrder));
            } catch (err) {
                return <Error>err;
            }
        });
    }

    public cancelOrders(orders: OpenOrder[]): OpenOrder[] {
        return orders.map(order => clone(this.core.ordering.cancelOpenOrder(order)));
    }

    public amendOrders(amendments: Amendment[]): (OpenOrder | Error)[] {
        return amendments.map((amendment): OpenOrder | Error => {
            try {
                const { filled } = this.core.ordering.cancelOpenOrder(amendment);
                const openOrder: OpenOrder = {
                    price: amendment.newPrice,
                    unfilled: amendment.newUnfilled,
                    quantity: amendment.newUnfilled.plus(filled),
                    filled,
                    id: amendment.id,
                    side: amendment.side,
                    length: amendment.length,
                    operation: amendment.operation,
                };
                this.core.validation.validateOrder(openOrder);
                return clone(this.core.ordering.makeOpenOrder(openOrder));
            } catch (err) {
                return <Error>err;
            }
        });
    }

    public getOpenOrders(): OpenOrder[] {
        return clone([...this.core.states.makers.values()]);
    }

    public getPositions(): Positions {
        this.core.clearing.clear();
        const positions = {
            position: this.core.states.assets.position,
            closable: this.core.states.margin.closable,
            time: this.core.timeline.now(),
        };
        return clone(positions);
    }

    public getBalances(): Balances {
        this.core.clearing.clear();
        const balances = {
            balance: this.core.states.assets.balance,
            available: this.core.states.margin.available,
            time: this.core.timeline.now(),
        };
        return clone(balances);
    }
}

export interface InterfaceInstant /* extends EventEmitter */ {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
