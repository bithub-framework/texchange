/// <reference types="node" />
import { Taken, TakenEvents } from './3-taken';
import { UnidentifiedTrade, Config, OpenOrder, Positions, Balances, OpenMaker, Snapshot, Orderbook } from './interfaces';
import Big from 'big.js';
import { AssetsManager } from './manager-assets';
import { EventEmitter } from 'events';
declare class ManagingAssets extends Taken {
    protected assets: AssetsManager;
    constructor(config: Config, snapshot: Snapshot, now: () => number);
    /** @override */
    protected makeOpenOrder(order: OpenOrder): OpenOrder;
    /** @override */
    protected cancelOrder(order: OpenOrder): OpenOrder;
    protected getPositions(): Positions;
    protected getBalances(): Balances;
    private enoughPosition;
    private singleLength;
    private enoughReserve;
    /** @override */
    protected orderTakes(taker: OpenOrder): UnidentifiedTrade[];
    protected pushPositionsAndBalances(): Promise<void>;
    /** @override */
    protected orderMakes(openOrder: OpenOrder): void;
    protected uTradeTakesOpenMaker(uTrade: UnidentifiedTrade, maker: OpenMaker): Big;
    protected settle(): void;
    updateTrades(uTrades: UnidentifiedTrade[]): void;
    /** @override */
    updateOrderbook(orderbook: Orderbook): void;
    getSnapshot(): Snapshot;
}
interface ManagingAssetsEvents extends TakenEvents {
    positions: [Positions];
    balances: [Balances];
}
interface ManagingAssets extends EventEmitter {
    on<Event extends keyof ManagingAssetsEvents>(event: Event, listener: (...args: ManagingAssetsEvents[Event]) => void): this;
    once<Event extends keyof ManagingAssetsEvents>(event: Event, listener: (...args: ManagingAssetsEvents[Event]) => void): this;
    off<Event extends keyof ManagingAssetsEvents>(event: Event, listener: (...args: ManagingAssetsEvents[Event]) => void): this;
    emit<Event extends keyof ManagingAssetsEvents>(event: Event, ...args: ManagingAssetsEvents[Event]): boolean;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this;
    off(event: string | symbol, listener: (...args: any[]) => void): this;
    emit(event: string | symbol, ...args: any[]): boolean;
}
export { ManagingAssets as default, ManagingAssets, ManagingAssetsEvents, };
