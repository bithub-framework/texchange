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
    constructor(private hub: Hub) { super(); }

    public pushTrades(trades: readonly Readonly<Trade>[]): void {
        this.emit('trades', trades.map(trade => ({
            id: trade.id,
            price: trade.price,
            quantity: trade.quantity,
            side: trade.side,
            time: trade.time,
        })));
    }

    public pushOrderbook(): void {
        const orderbook = this.hub.models.book.getBook();
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

    public makeOrders(orders: readonly Readonly<LimitOrder>[]): (OpenOrder | Error)[] {
        const { validation } = this.hub.presenters;
        return orders.map(order => {
            try {
                const openOrder = {
                    price: order.price,
                    quantity: order.quantity,
                    side: order.side,
                    length: order.length,
                    operation: order.operation,
                    id: ++this.hub.models.progress.userOrderCount,
                    filled: new Big(0),
                    unfilled: order.quantity,
                };
                validation.validateOrder(openOrder);
                return this.makeOpenOrder(openOrder);
            } catch (err) {
                return <Error>err;
            }
        });
    }

    private makeOpenOrder(order: OpenOrder): OpenOrder {
        const trades = this.hub.presenters.taking.orderTakes(order);
        this.hub.presenters.making.orderMakes(order);
        if (trades.length) {
            this.hub.views.instant.pushTrades(trades);
            this.hub.views.instant.pushOrderbook();
            this.hub.views.instant.pushBalances();
            this.hub.views.instant.pushPositions();
        }
        return order;
    }

    public cancelOrders(orders: readonly Readonly<OpenOrder>[]): OpenOrder[] {
        return orders.map(order => this.cancelOpenOrder(order));
    }

    private cancelOpenOrder(order: Readonly<OpenOrder>): OpenOrder {
        const { makers } = this.hub.models;
        let filled = makers.get(order.id)?.filled;
        if (typeof filled === 'undefined')
            filled = order.quantity;
        else
            makers.tryRemoveOrder(order.id)!;
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

    public amendOrders(
        amendments: readonly Readonly<Amendment>[],
    ): (OpenOrder | Error)[] {
        const { validation } = this.hub.presenters;
        return amendments.map(amendment => {
            const oldOrder = this.cancelOpenOrder(amendment);
            try {
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
                validation.validateOrder(newOrder);
                return this.makeOpenOrder(newOrder);
            } catch (err) {
                return <Error>err;
            }
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
                .minus(makers.totalFrozen.position[Length.LONG]),
            [Length.SHORT]: assets.position[Length.SHORT]
                .minus(makers.totalFrozen.position[Length.SHORT]),
        };
    }
}

export interface Instant extends EventEmitter {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
