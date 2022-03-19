import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { Models } from '../models/models';
import { Balances, Closable, Positions, Length, HLike, TexchangeOpenOrder, TexchangeTrade } from 'interfaces';
export declare abstract class Tasks<H extends HLike<H>> {
    readonly getBalances: GetBalancesLike<H>;
    readonly getPositions: GetPositionsLike<H>;
    abstract readonly getAvailable: GetAvailableLike<H>;
    readonly getClosable: GetClosableLike<H>;
    abstract readonly settle: SettleLike;
    readonly orderMakes: OrderMakesLike<H>;
    readonly tradeTakesOpenMakers: TradeTakesOpenMakersLike<H>;
    readonly orderTakes: OrderTakesLike<H>;
    readonly validateOrder: ValidateOrderLike<H>;
    readonly makeOpenOrder: MakeOpenOrderLike<H>;
    readonly cancelOpenOrder: CancelOpenOrderLike<H>;
    abstract readonly marginAccumulation: MarginAccumulationLike<H>;
    readonly orderVolumes: OrderVolumesLike<H>;
    protected constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>);
}
export interface GetBalancesLike<H extends HLike<H>> {
    getBalances(): Balances<H>;
}
export interface GetPositionsLike<H extends HLike<H>> {
    getPositions(): Positions<H>;
}
export interface GetAvailableLike<H extends HLike<H>> {
    getAvailable(): H;
}
export interface GetClosableLike<H extends HLike<H>> {
    getClosable(): Closable<H>;
}
export interface SettleLike {
    settle(): void;
}
export interface OrderMakesLike<H extends HLike<H>> {
    orderMakes(openOrder: TexchangeOpenOrder<H>): void;
}
export interface OrderTakesLike<H extends HLike<H>> {
    orderTakes(taker: TexchangeOpenOrder<H>): TexchangeTrade<H>[];
}
export interface TradeTakesOpenMakersLike<H extends HLike<H>> {
    tradeTakesOpenMakers(trade: TexchangeTrade<H>): void;
}
export interface MakeOpenOrderLike<H extends HLike<H>> {
    makeOpenOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H>;
}
export interface CancelOpenOrderLike<H extends HLike<H>> {
    cancelOpenOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H>;
}
export interface ValidateOrderLike<H extends HLike<H>> {
    validateOrder(order: TexchangeOpenOrder<H>): void;
}
export interface MarginAccumulationLike<H extends HLike<H>> {
    newMarginAfterOpening(volumes: MarginAccumulationLike.Volumes<H>): H;
    newMarginAfterClosing(volumes: MarginAccumulationLike.Volumes<H>): H;
}
export declare namespace MarginAccumulationLike {
    interface Volumes<H extends HLike<H>> {
        length: Length;
        volume: H;
        dollarVolume: H;
    }
}
export interface OrderVolumesLike<H extends HLike<H>> {
    open(volumes: OrderVolumesLike.Volumes<H>): void;
    close(volumes: OrderVolumesLike.Volumes<H>): void;
}
export declare namespace OrderVolumesLike {
    interface Volumes<H extends HLike<H>> {
        length: Length;
        volume: H;
        dollarVolume: H;
    }
}