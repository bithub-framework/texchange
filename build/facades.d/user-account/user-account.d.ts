import { LimitOrder, Balances, Positions, AccountApiLike, AccountSpec, HLike, OpenOrder, Amendment, AccountEventEmitterLike } from 'secretary-like';
import { Context } from '../../context';
import { Instant } from './instant';
import { Config } from '../config';
import { UseCaseSubscription } from '../../use-cases.d/subscription';
export declare class UserAccountFacade<H extends HLike<H>> implements AccountApiLike<H> {
    private context;
    private useCases;
    private instant;
    private config;
    spec: AccountSpec;
    events: AccountEventEmitterLike<H>;
    constructor(context: Context<H>, useCases: AccountLatency.UseCaseDeps<H>, instant: Instant<H>, config: Config);
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
