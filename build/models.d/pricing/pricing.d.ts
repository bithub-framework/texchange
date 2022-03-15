import { Model } from '../../model';
import { HLike, TexchangeTrade } from 'interfaces';
export declare abstract class Pricing<H extends HLike<H>, Snapshot> extends Model<H, Snapshot> {
    abstract getSettlementPrice(): H;
    abstract updateTrades(trades: readonly TexchangeTrade<H>[]): void;
}
