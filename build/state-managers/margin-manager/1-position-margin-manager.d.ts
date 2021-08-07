import Big from 'big.js';
import { Length } from '../../interfaces';
export declare abstract class MarginManager {
    abstract positionMargin: {
        [length: number]: Big;
    };
    incPositionMargin(length: Length, increment: Big): void;
    decPositionMargin(length: Length, decrement: Big): void;
    setPositionMargin(length: Length, positionMargin: Big): void;
}
