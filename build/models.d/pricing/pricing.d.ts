import { Model } from '../../model';
import { HLike, ConcreteTrade } from 'interfaces';
export declare abstract class Pricing<H extends HLike<H>, Snapshot> extends Model<H, Snapshot> {
    abstract getSettlementPrice(): H;
    abstract updateTrades(trades: readonly ConcreteTrade<H>[]): void;
}
