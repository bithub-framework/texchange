import { AvailableAssetsCalculator } from './available-assets-calculator';
import { HLike } from 'secretary-like';
export declare class DefaultAvailableAssetsCalculator<H extends HLike<H>> extends AvailableAssetsCalculator<H> {
    protected getFinalFrozenBalance(): H;
}
