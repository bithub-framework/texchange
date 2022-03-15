/// <reference types="node" />
import { LimitOrder, TexchangeAmendment, TexchangeOpenOrder, Balances, Positions, ContextMarketApiLike, ContextAccountApiLike, MarketEvents, AccountEvents, HLike, TexchangeTradeId, TexchangeOrderId } from 'interfaces';
import { EventEmitter } from 'events';
import { Context } from '../context';
import { Instant } from './instant';
export declare class Latency<H extends HLike<H>> extends EventEmitter implements ContextMarketApiLike<H, TexchangeTradeId>, ContextAccountApiLike<H, TexchangeOrderId> {
    private context;
    private instant;
    constructor(context: Context<H>, instant: Instant<H>);
    makeOrders(orders: LimitOrder<H>[]): Promise<(TexchangeOpenOrder<H> | Error)[]>;
    amendOrders(amendments: TexchangeAmendment<H>[]): Promise<(TexchangeOpenOrder<H> | Error)[]>;
    cancelOrders(orders: TexchangeOpenOrder<H>[]): Promise<TexchangeOpenOrder<H>[]>;
    getBalances(): Promise<Balances<H>>;
    getPositions(): Promise<Positions<H>>;
    getOpenOrders(): Promise<TexchangeOpenOrder<H>[]>;
}
export declare type Events<H extends HLike<H>> = MarketEvents<H, TexchangeTradeId> & AccountEvents<H>;
export interface Latency<H extends HLike<H>> {
    on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}
