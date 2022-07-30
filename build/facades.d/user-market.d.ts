import { MarketApiLike, MarketSpec, HLike, MarketEvents } from 'secretary-like';
import { EventEmitter } from 'events';
import { VirtualMachineContextLike } from '../vmctx';
import { Config } from './config';
import { UseCaseSubscription } from '../use-cases.d/subscription';
export declare class UserMarketFacade<H extends HLike<H>> extends EventEmitter implements MarketApiLike<H> {
    private vMCTX;
    private marketSpec;
    private useCaseSubscription;
    private config;
    on: <Event extends keyof MarketEvents<H>>(event: Event, listener: (...args: MarketEvents<H>[Event]) => void) => this;
    once: <Event extends keyof MarketEvents<H>>(event: Event, listener: (...args: MarketEvents<H>[Event]) => void) => this;
    off: <Event extends keyof MarketEvents<H>>(event: Event, listener: (...args: MarketEvents<H>[Event]) => void) => this;
    emit: <Event extends keyof MarketEvents<H>>(event: Event, ...args: MarketEvents<H>[Event]) => boolean;
    PRICE_SCALE: number;
    QUANTITY_SCALE: number;
    CURRENCY_SCALE: number;
    TICK_SIZE: H;
    MARKET_NAME: string;
    constructor(vMCTX: VirtualMachineContextLike<H>, marketSpec: MarketSpec<H>, useCaseSubscription: UseCaseSubscription<H>, config: Config);
    quantity(price: H, dollarVolume: H): H;
    dollarVolume(price: H, quantity: H): H;
}
