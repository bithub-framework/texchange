/// <reference types="node" />
import { Taken, TakenEvents } from './3-taken';
import { UnidentifiedTrade, Config, OpenOrder, Positions, Balances, OpenMaker, Snapshot } from './interfaces';
import Big from 'big.js';
import { AssetsManager } from './manager-assets';
import { Frozen } from './manager-open-makers';
import { EventEmitter } from 'events';
declare abstract class ManagingAssets extends Taken {
    protected assets: AssetsManager;
    constructor(config: Config, snapshot: Snapshot, now: () => number);
    /** @override */
    protected makeOpenOrder(order: OpenOrder): OpenOrder;
    /** @override */
    protected cancelOrderNoDelay(order: OpenOrder): OpenOrder;
    protected getPositionsNoDelay(): Positions;
    protected getBalancesNoDelay(): Balances;
    private enoughPosition;
    private singleLength;
    private enoughReserve;
    protected orderTakes(taker: OpenOrder): readonly [Pick<import("interfaces/dist/data").Trade, "side" | "price" | "quantity" | "time">[], Big, Big];
    protected pushPositionsAndBalances(): Promise<void>;
    protected orderMakes(openOrder: OpenOrder): Frozen;
    protected uTradeTakesOpenMaker(uTrade: UnidentifiedTrade, maker: OpenMaker): [Big, Big, Frozen];
    protected settle(): void;
    updateTrades(uTrades: UnidentifiedTrade[]): Big;
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
