/// <reference types="node" />
import { Taken } from './3-taken';
import { LimitOrder, OrderId, UnidentifiedTrade, Config, OpenOrder, Positions, Balances, Orderbook, Trade, OpenMaker } from './interfaces';
import Big from 'big.js';
import { AssetsManager } from './manager-assets';
import { Frozen } from './manager-open-orders';
import { EventEmitter } from 'events';
declare abstract class ManagingAssets extends Taken {
    protected assets: AssetsManager;
    constructor(config: Config, now: () => number);
    protected makeLimitOrderSync(order: LimitOrder): void;
    protected cancelOrderSync(oid: OrderId): Big | null;
    protected getPositionsSync(): Positions;
    protected getBalancesSync(): Balances;
    private enoughPosition;
    private singleLength;
    private enoughReserve;
    protected orderTakes(taker: OpenOrder): readonly [Pick<Trade, "side" | "price" | "quantity" | "time">[], Big, Big];
    protected pushPositionsAndBalances(): Promise<void>;
    protected orderMakes(openOrder: OpenOrder): Frozen;
    protected uTradeTakesOpenMaker(uTrade: UnidentifiedTrade, maker: OpenMaker): [Big, Big, Frozen];
    protected settle(): void;
    updateTrades(uTrades: UnidentifiedTrade[]): Big;
}
interface ManagingAssets extends EventEmitter {
    emit(event: 'positions', positions: Positions): boolean;
    emit(event: 'balances', balances: Balances): boolean;
    on(event: 'positions', listener: (positions: Positions) => void): this;
    on(event: 'balances', listener: (balances: Balances) => void): this;
    off(event: 'positions', listener: (positions: Positions) => void): this;
    off(event: 'balances', listener: (balances: Balances) => void): this;
    once(event: 'positions', listener: (positions: Positions) => void): this;
    once(event: 'balances', listener: (balances: Balances) => void): this;
    emit(event: 'orderbook', orderbook: Orderbook): boolean;
    emit(event: 'trades', trades: Trade[]): boolean;
    emit(event: 'error', err: Error): boolean;
    on(event: 'orderbook', listener: (orderbook: Orderbook) => void): this;
    on(event: 'trades', listener: (trades: Trade[]) => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
    off(event: 'orderbook', listener: (orderbook: Orderbook) => void): this;
    off(event: 'trades', listener: (trades: Trade[]) => void): this;
    off(event: 'error', listener: (err: Error) => void): this;
    once(event: 'orderbook', listener: (orderbook: Orderbook) => void): this;
    once(event: 'trades', listener: (trades: Trade[]) => void): this;
    once(event: 'error', listener: (err: Error) => void): this;
}
export { ManagingAssets as default, ManagingAssets, };
