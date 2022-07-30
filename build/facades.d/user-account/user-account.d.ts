import { LimitOrderLike, BalancesLike, PositionsLike, AccountApiLike, AccountSpecLike, HLike, OpenOrderLike, AmendmentLike, AccountEvents } from 'secretary-like';
import { EventEmitter } from 'events';
import { VirtualMachineContextLike } from '../../vmctx';
import { Instant } from './instant';
import { Config } from '../config';
import { UseCaseSubscription } from '../../use-cases.d/subscription';
export declare class UserAccountFacade<H extends HLike<H>> extends EventEmitter implements AccountApiLike<H> {
    private context;
    private accountSpec;
    private useCaseSubscription;
    private instant;
    private config;
    on: <Event extends keyof AccountEvents<H>>(event: Event, listener: (...args: AccountEvents<H>[Event]) => void) => this;
    once: <Event extends keyof AccountEvents<H>>(event: Event, listener: (...args: AccountEvents<H>[Event]) => void) => this;
    off: <Event extends keyof AccountEvents<H>>(event: Event, listener: (...args: AccountEvents<H>[Event]) => void) => this;
    emit: <Event extends keyof AccountEvents<H>>(event: Event, ...args: AccountEvents<H>[Event]) => boolean;
    LEVERAGE: number;
    TAKER_FEE_RATE: number;
    MAKER_FEE_RATE: number;
    constructor(context: VirtualMachineContextLike<H>, accountSpec: AccountSpecLike, useCaseSubscription: UseCaseSubscription<H>, instant: Instant<H>, config: Config);
    makeOrders($orders: LimitOrderLike<H>[]): Promise<(OpenOrderLike<H> | Error)[]>;
    amendOrders($amendments: AmendmentLike<H>[]): Promise<(OpenOrderLike<H> | Error)[]>;
    cancelOrders($orders: OpenOrderLike<H>[]): Promise<OpenOrderLike<H>[]>;
    getBalances(): Promise<BalancesLike<H>>;
    getPositions(): Promise<PositionsLike<H>>;
    getOpenOrders(): Promise<OpenOrderLike<H>[]>;
}
