import { Length, HLike, MarketSpec, AccountSpec, Position } from 'secretary-like';
import { Executed } from '../../interfaces/executed';
import { Context } from '../../context';
import { StatefulLike } from '../../stateful-like';
import { Assets } from './assets/assets';
import { Margin, MarginStatic } from './margin';
import { Cost } from './assets/cost';
export declare abstract class MarginAssets<H extends HLike<H>> implements StatefulLike<Snapshot> {
    protected context: Context<H>;
    protected marketSpec: MarketSpec<H>;
    protected accountSpec: AccountSpec;
    protected assets: Assets<H>;
    protected Margin: MarginStatic<H>;
    protected $margin: Margin<H>;
    constructor(context: Context<H>, marketSpec: MarketSpec<H>, accountSpec: AccountSpec, assets: Assets<H>);
    open({ length, volume, dollarVolume, }: Executed<H>): void;
    close({ length, volume, dollarVolume, }: Executed<H>): void;
    abstract getFinalMargin(): H;
    abstract settle(length: Length, settlementPrice: H): void;
    abstract assertEnoughBalance(): void;
    capture(): Snapshot;
    restore(snapshot: Snapshot): void;
    getPosition(): Position<H>;
    getBalance(): H;
    getCost(): Cost<H>;
    pay(fee: H): void;
}
export interface Snapshot {
    assets: Assets.Snapshot;
    margin: Margin.Snapshot;
}
