import { Length, Position, HLike } from 'secretary-like';
import { Cost } from './cost';
import { Executed } from '../../../data-types/executed';
export interface CreditAssetsLike<H extends HLike<H>> {
    getBalance(): H;
    getPosition(): Position<H>;
    getCost(): Cost<H>;
    pay(fee: H): void;
    open({ length, volume, dollarVolume, }: Executed<H>): void;
    /**
     *
     * @returns Profit
     */
    close({ length, volume, dollarVolume, }: Executed<H>): H;
    /**
     * @returns Profit
     */
    settle(length: Length, settlementPrice: H): H;
}
