import { Positions, HLike } from 'secretary-like';
import { AvailableAssetsCalculator } from '../middlewares/available-assets-calculator/available-assets-calculator';
export declare class UseCaseGetPositions<H extends HLike<H>> {
    private calculator;
    constructor(calculator: AvailableAssetsCalculator<H>);
    getPositions(): Positions<H>;
}
