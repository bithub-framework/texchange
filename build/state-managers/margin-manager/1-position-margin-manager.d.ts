import { Config } from '../../interfaces';
import Big from 'big.js';
import { EquityManager } from '../equity-manager';
export declare abstract class MarginManager {
    abstract marginSum: Big;
    protected abstract config: Config;
    protected abstract getSettlementPrice: () => Big;
    protected abstract getLatestPrice: () => Big;
    protected abstract equity: EquityManager;
    get margin(): Big;
    incMargin(increment: Big): void;
    decMargin(decrement: Big): void;
}
