import { Balances, HLike } from 'secretary-like';
import { AvailableAssetsCalculator } from '../middlewares/available-assets-calculator/available-assets-calculator';
export declare class UseCaseGetBalances<H extends HLike<H>> {
    private calculator;
    constructor(calculator: AvailableAssetsCalculator<H>);
    getBalances(): Balances<H>;
}
