import { Core as Parent, Events } from './3-taken';
import { UnidentifiedTrade, OpenOrder } from './interfaces';
import { EquityManager } from './state-managers/equity-manager';
declare abstract class Core extends Parent {
    protected abstract equity: EquityManager;
    protected abstract settle(): void;
    /** @override */
    protected validateOrder(order: OpenOrder): void;
    protected assertEnoughPosition(order: OpenOrder): void;
    /** @override */
    protected makeOpenOrder(order: OpenOrder): OpenOrder;
    /** @override */
    protected orderTakes(taker: OpenOrder): UnidentifiedTrade[];
    /** @override */
    protected orderMakes(openOrder: OpenOrder): void;
}
export { Core, Events, };
