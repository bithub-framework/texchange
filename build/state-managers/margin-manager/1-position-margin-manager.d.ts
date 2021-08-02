import Big from 'big.js';
export declare abstract class MarginManager {
    abstract positionMargin: Big;
    incPositionMargin(increment: Big): void;
    decPositionMargin(decrement: Big): void;
    setPositionMargin(positionMargin: Big): void;
}
