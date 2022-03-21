import { EventEmitter } from 'events';
import { Context } from '../context';
import {
    TexchangeOpenOrder,
    LimitOrder,
    TexchangeAmendment,
    Positions,
    Balances,
    TexchangeTradeId,
    MarketEvents,
    AccountEvents,
} from 'interfaces';
import { HLike } from 'interfaces';

import { MakeOrder } from '../use-cases.d/make-order';
import { CancelOrder } from '../use-cases.d/cancel-order';
import { AmendOrder } from '../use-cases.d/amend-order';
import { GetPositions } from '../use-cases.d/get-positions';
import { GetBalances } from '../use-cases.d/get-balances';
import { GetOpenOrders } from '../use-cases.d/get-open-orders';


export class Instant<H extends HLike<H>>
    extends EventEmitter {
    constructor(
        private context: Context<H>,
        private useCases: Instant.UseCaseDeps<H>,
    ) {
        super();
        // this.initializePushingTrades();
        // this.initializePushingOrderbook();
    }

    // private initializePushingTrades(): void {
    //     this.tasks.on('pushTrades', trades => {
    //         this.emit('trades', trades.map(trade => ({
    //             id: trade.id,
    //             price: trade.price,
    //             quantity: trade.quantity,
    //             side: trade.side,
    //             time: trade.time,
    //         })));
    //     })
    // }

    // private initializePushingOrderbook(): void {
    //     this.scheduler.on('pushOrderbook', orderbook => {
    //         this.emit('orderbook', {
    //             [Side.ASK]: orderbook[Side.ASK].map(order => ({
    //                 price: order.price,
    //                 quantity: order.quantity,
    //                 side: order.side,
    //             })),
    //             [Side.BID]: orderbook[Side.BID].map(order => ({
    //                 price: order.price,
    //                 quantity: order.quantity,
    //                 side: order.side,
    //             })),
    //             time: orderbook.time,
    //         });
    //     });
    // }

    public makeOrders(
        orders: readonly LimitOrder<H>[],
    ): (TexchangeOpenOrder<H> | Error)[] {
        return orders.map(order => {
            try {
                return this.useCases.makeOrder.makeOrder(order);
            } catch (err) {
                return <Error>err;
            }
        });
    }

    public cancelOrders(
        orders: readonly TexchangeOpenOrder<H>[],
    ): TexchangeOpenOrder<H>[] {
        return orders.map(order => this.useCases.cancelOrder.cancelOrder(order));
    }

    public amendOrders(
        amendments: readonly TexchangeAmendment<H>[],
    ): (TexchangeOpenOrder<H> | Error)[] {
        return amendments.map(amendment => {
            try {
                return this.useCases.amendOrder.amendOrder(amendment);
            } catch (err) {
                return <Error>err;
            }
        });
    }

    public getOpenOrders(): TexchangeOpenOrder<H>[] {
        return this.useCases.getOpenOrders.getOpenOrders();
    }

    public getPositions(): Positions<H> {
        return this.useCases.getPositions.getPositions();
    }

    public getBalances(): Balances<H> {
        return this.useCases.getBalances.getBalances();
    }
}

export type Events<H extends HLike<H>>
    = MarketEvents<H, TexchangeTradeId> & AccountEvents<H>;

export interface Instant<H extends HLike<H>> extends EventEmitter {
    on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}

export namespace Instant {
    export interface UseCaseDeps<H extends HLike<H>> {
        makeOrder: MakeOrder<H>;
        cancelOrder: CancelOrder<H>;
        amendOrder: AmendOrder<H>;
        getOpenOrders: GetOpenOrders<H>;
        getBalances: GetBalances<H>;
        getPositions: GetPositions<H>;
    }
}
