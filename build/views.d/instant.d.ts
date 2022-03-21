/// <reference types="node" />
import { EventEmitter } from 'events';
import { Context } from '../context';
import { TexchangeOpenOrder, LimitOrder, TexchangeAmendment, Positions, Balances, TexchangeTradeId, MarketEvents, AccountEvents } from 'interfaces';
import { HLike } from 'interfaces';
import { MakeOrder } from '../use-cases.d/make-order';
import { CancelOrder } from '../use-cases.d/cancel-order';
import { AmendOrder } from '../use-cases.d/amend-order';
import { GetPositions } from '../use-cases.d/get-positions';
import { GetBalances } from '../use-cases.d/get-balances';
import { GetOpenOrders } from '../use-cases.d/get-open-orders';
export declare class Instant<H extends HLike<H>> extends EventEmitter {
    private context;
    private useCases;
    constructor(context: Context<H>, useCases: Instant.UseCaseDeps<H>);
    makeOrders(orders: readonly LimitOrder<H>[]): (TexchangeOpenOrder<H> | Error)[];
    cancelOrders(orders: readonly TexchangeOpenOrder<H>[]): TexchangeOpenOrder<H>[];
    amendOrders(amendments: readonly TexchangeAmendment<H>[]): (TexchangeOpenOrder<H> | Error)[];
    getOpenOrders(): TexchangeOpenOrder<H>[];
    getPositions(): Positions<H>;
    getBalances(): Balances<H>;
}
export declare type Events<H extends HLike<H>> = MarketEvents<H, TexchangeTradeId> & AccountEvents<H>;
export interface Instant<H extends HLike<H>> extends EventEmitter {
    on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}
export declare namespace Instant {
    interface UseCaseDeps<H extends HLike<H>> {
        makeOrder: MakeOrder<H>;
        cancelOrder: CancelOrder<H>;
        amendOrder: AmendOrder<H>;
        getOpenOrders: GetOpenOrders<H>;
        getBalances: GetBalances<H>;
        getPositions: GetPositions<H>;
    }
}
