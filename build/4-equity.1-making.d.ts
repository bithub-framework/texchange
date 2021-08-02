import { Texchange as Parent, Events } from './3-taken';
import { LimitOrder, UnidentifiedTrade, OpenOrder } from './interfaces';
import { EquityManager } from './state-managers/equity-manager';
declare abstract class Texchange extends Parent {
    protected abstract equity: EquityManager;
    protected abstract clear(): void;
    /** @override */
    protected validateOrder(order: OpenOrder): void;
    protected assertEnoughPosition(order: OpenOrder): void;
    protected singleLength(order: LimitOrder): void;
    /** @override */
    protected makeOpenOrder(order: OpenOrder): OpenOrder;
    /** @override */
    protected orderTakes(taker: OpenOrder): UnidentifiedTrade[];
    /** @override */
    protected orderMakes(openOrder: OpenOrder): void;
}
export { Texchange, Events, };
