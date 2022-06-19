import { LimitOrder, Balances, Positions, AccountApiLike, AccountSpec, MarketSpec, HLike, OpenOrder, Amendment, AccountEvents } from 'secretary-like';
import { EventEmitter } from 'events';
import { Context } from '../../context';
import { Instant } from './instant';
import { Config } from '../config';
import { UseCaseSubscription } from '../../use-cases.d/subscription';
export declare class UserAccountFacade<H extends HLike<H>> extends EventEmitter implements AccountApiLike<H> {
    private context;
    private marketSpec;
    private accountSpec;
    private useCases;
    private instant;
    private config;
    on: <Event extends keyof AccountEvents<H>>(event: Event, listener: (...args: AccountEvents<H>[Event]) => void) => this;
    once: <Event extends keyof AccountEvents<H>>(event: Event, listener: (...args: AccountEvents<H>[Event]) => void) => this;
    off: <Event extends keyof AccountEvents<H>>(event: Event, listener: (...args: AccountEvents<H>[Event]) => void) => this;
    emit: <Event extends keyof AccountEvents<H>>(event: Event, ...args: AccountEvents<H>[Event]) => boolean;
    LEVERAGE: number;
    TAKER_FEE_RATE: number;
    MAKER_FEE_RATE: number;
    constructor(context: Context<H>, marketSpec: MarketSpec<H>, accountSpec: AccountSpec, useCases: AccountLatency.UseCaseDeps<H>, instant: Instant<H>, config: Config);
    makeOrders($orders: LimitOrder<H>[]): Promise<(OpenOrder<H> | Error)[]>;
    amendOrders($amendments: Amendment<H>[]): Promise<(OpenOrder<H> | Error)[]>;
    cancelOrders($orders: OpenOrder<H>[]): Promise<OpenOrder<H>[]>;
    getBalances(): Promise<Balances<H>>;
    getPositions(): Promise<Positions<H>>;
    getOpenOrders(): Promise<OpenOrder<H>[]>;
    quantity(price: H, dollarVolume: H): H;
    dollarVolume(price: H, quantity: H): H;
}
export declare namespace AccountLatency {
    interface UseCaseDeps<H extends HLike<H>> {
        subscription: UseCaseSubscription<H>;
    }
}
