import { LimitOrder, Balances, Positions, AccountApiLike, AccountSpec, HLike, OpenOrder, Amendment, AccountEvents } from 'secretary-like';
import { EventEmitter } from 'events';
import { VirtualMachineContextLike } from '../../vmctx';
import { Instant } from './instant';
import { AdminFacade } from '../admin';
import { LatencyConfig } from '../latency-config';
import { UseCaseSubscription } from '../../use-cases.d/subscription';
export declare class UserAccountFacade<H extends HLike<H>> extends EventEmitter implements AccountApiLike<H> {
    private vmctx;
    private accountSpec;
    private useCaseSubscription;
    private instant;
    private adminFacade;
    private config;
    on: <Event extends keyof AccountEvents<H>>(event: Event, listener: (...args: AccountEvents<H>[Event]) => void) => this;
    once: <Event extends keyof AccountEvents<H>>(event: Event, listener: (...args: AccountEvents<H>[Event]) => void) => this;
    off: <Event extends keyof AccountEvents<H>>(event: Event, listener: (...args: AccountEvents<H>[Event]) => void) => this;
    emit: <Event extends keyof AccountEvents<H>>(event: Event, ...args: AccountEvents<H>[Event]) => boolean;
    LEVERAGE: number;
    TAKER_FEE_RATE: number;
    MAKER_FEE_RATE: number;
    constructor(vmctx: VirtualMachineContextLike<H>, accountSpec: AccountSpec, useCaseSubscription: UseCaseSubscription<H>, instant: Instant<H>, adminFacade: AdminFacade<H>, config: LatencyConfig);
    makeOrders($orders: LimitOrder.Source<H>[]): Promise<(OpenOrder<H> | Error)[]>;
    amendOrders($amendments: Amendment.Source<H>[]): Promise<(OpenOrder<H> | Error)[]>;
    cancelOrders($orders: OpenOrder.Source<H>[]): Promise<OpenOrder<H>[]>;
    getBalances(): Promise<Balances<H>>;
    getPositions(): Promise<Positions<H>>;
    getOpenOrders(): Promise<OpenOrder<H>[]>;
}
