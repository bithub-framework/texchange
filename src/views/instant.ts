import { EventEmitter } from 'events';
import {
    Events,
    Trade,
    OpenOrder,
    LimitOrder,
    Amendment,
    Positions,
    Balances,
    Side, Length,
    Closable,
} from '../interfaces';
import Big from 'big.js';
import { type Hub } from '../hub';


export class Instant extends EventEmitter {
    constructor(private hub: Hub) {
        super();
    }

    public pushTrades(trades: Trade[]): void {
        this.emit('trades', trades.map(trade => ({
            id: trade.id,
            price: trade.price,
            quantity: trade.quantity,
            side: trade.side,
            time: trade.time,
        })));
    }

    public pushOrderbook(): void {
        const { orderbooks: orderbook } = this.hub.models;
        this.emit('orderbook', {
            [Side.ASK]: orderbook[Side.ASK].map(order => ({
                price: order.price,
                quantity: order.quantity,
                side: order.side,
            })),
            [Side.BID]: orderbook[Side.BID].map(order => ({
                price: order.price,
                quantity: order.quantity,
                side: order.side,
            })),
            time: orderbook.time,
        });
    }

    public makeOrders(orders: LimitOrder[]): (OpenOrder | Error)[] {
        return orders.map(order => this.makeOpenOrder({
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: ++this.hub.models.progress.userOrderCount,
            filled: new Big(0),
            unfilled: order.quantity,
        }));
    }

    /**
     * @returns As duplicate.
     */
    private makeOpenOrder(order: OpenOrder): OpenOrder | Error {
        try {
            const openOrder: OpenOrder = {
                price: order.price,
                quantity: order.quantity,
                side: order.side,
                length: order.length,
                operation: order.operation,
                id: ++this.hub.models.progress.userOrderCount,
                filled: new Big(0),
                unfilled: order.quantity,
            };
            this.hub.presenters.validation.validateOrder(openOrder);
            const trades = this.hub.presenters.taking.orderTakes(openOrder);
            this.hub.presenters.making.orderMakes(openOrder);
            if (trades.length) {
                this.hub.views.instant.pushTrades(trades);
                this.hub.views.instant.pushOrderbook();
                this.hub.views.instant.pushBalances();
                this.hub.views.instant.pushPositions();
            }
            return openOrder
        } catch (err) {
            return <Error>err;
        }
    }

    public cancelOrders(orders: OpenOrder[]): OpenOrder[] {
        return orders.map(order => this.cancelOpenOrder(order));
    }

    /**
     * @returns As duplicate.
     */
    private cancelOpenOrder(order: OpenOrder): OpenOrder {
        const { makers } = this.hub.models;
        let filled = makers.get(order.id)?.filled;
        if (typeof filled === 'undefined')
            filled = order.quantity;
        else
            makers.removeOrder(order.id)!;
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

    public amendOrders(amendments: Amendment[]): (OpenOrder | Error)[] {
        return amendments.map(amendment => {
            const oldOrder = this.cancelOpenOrder(amendment);
            const newOrder: OpenOrder = {
                price: amendment.newPrice,
                filled: oldOrder.filled,
                unfilled: amendment.newUnfilled,
                quantity: amendment.newUnfilled.plus(oldOrder.filled),
                id: amendment.id,
                side: amendment.side,
                length: amendment.length,
                operation: amendment.operation,
            };
            return this.makeOpenOrder(newOrder);
        });
    }

    public getOpenOrders(): OpenOrder[] {
        const openOrders = [...this.hub.models.makers.values()];
        return openOrders.map(order => ({
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: order.id,
            filled: order.filled,
            unfilled: order.unfilled,
        }));
    }

    public getPositions(): Positions {
        return {
            position: {
                [Length.LONG]: this.hub.models.assets.position[Length.LONG],
                [Length.SHORT]: this.hub.models.assets.position[Length.SHORT],
            },
            closable: this.getClosable(),
            time: this.hub.context.timeline.now(),
        };
    }

    public getBalances(): Balances {
        return {
            balance: this.hub.models.assets.balance,
            available: this.getAvailable(),
            time: this.hub.context.timeline.now(),
        };
    }

    public pushBalances(): void {
        this.emit('balances', this.getBalances());
    }

    public pushPositions(): void {
        this.emit('positions', this.getPositions());
    }

    public getAvailable(): Big {
        return this.hub.models.assets.balance
            .minus(this.hub.context.calculation.finalMargin())
            .minus(this.hub.context.calculation.finalFrozenBalance())
            .round(this.hub.context.config.CURRENCY_DP);
    }

    public getClosable(): Closable {
        const { assets, makers } = this.hub.models;
        return {
            [Length.LONG]: assets.position[Length.LONG]
                .minus(makers.frozenSum.position[Length.LONG]),
            [Length.SHORT]: assets.position[Length.SHORT]
                .minus(makers.frozenSum.position[Length.SHORT]),
        };
    }
}

export interface Instant extends EventEmitter {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
