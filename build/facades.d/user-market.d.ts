import { MarketApiLike, MarketSpecLike, HLike, MarketEvents } from 'secretary-like';
import { EventEmitter } from 'events';
import { Context } from '../context';
import { Config } from './config';
import { UseCaseSubscription } from '../use-cases.d/subscription';
export declare class UserMarketFacade<H extends HLike<H>> extends EventEmitter implements MarketApiLike<H> {
    private context;
    private marketSpec;
    private useCaseSubscription;
    private config;
    on: <Event extends keyof MarketEvents<H>>(event: Event, listener: (...args: MarketEvents<H>[Event]) => void) => this;
    once: <Event extends keyof MarketEvents<H>>(event: Event, listener: (...args: MarketEvents<H>[Event]) => void) => this;
    off: <Event extends keyof MarketEvents<H>>(event: Event, listener: (...args: MarketEvents<H>[Event]) => void) => this;
    emit: <Event extends keyof MarketEvents<H>>(event: Event, ...args: MarketEvents<H>[Event]) => boolean;
    PRICE_DP: number;
    QUANTITY_DP: number;
    CURRENCY_DP: number;
    TICK_SIZE: H;
    MARKET_NAME: string;
    constructor(context: Context<H>, marketSpec: MarketSpecLike<H>, useCaseSubscription: UseCaseSubscription<H>, config: Config);
    quantity(price: H, dollarVolume: H): H;
    dollarVolume(price: H, quantity: H): H;
}
