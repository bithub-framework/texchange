import { LimitOrder, Balances, Positions, AccountApiLike, AccountSpec, HLike } from 'interfaces';
import { TradeId, OrderId, OpenOrder, Amendment, AccountEventEmitterLike } from '../../interfaces';
import { Context } from '../../context';
import { Instant } from '../instant';
import { Subscription } from '../../use-cases.d/subscription';
export declare class AccountLatency<H extends HLike<H>> implements AccountApiLike<H, OrderId, TradeId> {
    private context;
    private useCases;
    private instant;
    spec: AccountSpec;
    events: AccountEventEmitterLike<H>;
    private Positions;
    private Balances;
    private LimitOrder;
    private OrderId;
    private Amendment;
    private OpenOrder;
    constructor(context: Context<H>, useCases: Latency.UseCaseDeps<H>, instant: Instant<H>);
    makeOrders($orders: LimitOrder<H>[]): Promise<(OpenOrder<H> | Error)[]>;
    amendOrders($amendments: Amendment<H>[]): Promise<(OpenOrder<H> | Error)[]>;
    cancelOrders($orders: OpenOrder<H>[]): Promise<OpenOrder<H>[]>;
    getBalances(): Promise<Balances<H>>;
    getPositions(): Promise<Positions<H>>;
    getOpenOrders(): Promise<OpenOrder<H>[]>;
    quantity(price: H, dollarVolume: H): H;
    dollarVolume(price: H, quantity: H): H;
}
export declare namespace Latency {
    interface UseCaseDeps<H extends HLike<H>> {
        subscription: Subscription<H>;
    }
}
