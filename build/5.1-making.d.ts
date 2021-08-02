import { Texchange as Parent, Events } from './4-equity';
import { UnidentifiedTrade, OpenOrder } from './interfaces';
import { MarginManager } from './state-managers/margin-manager/main';
declare abstract class Texchange extends Parent {
    protected abstract pushPositionsAndBalances(): void;
    protected abstract margin: MarginManager;
    /** @override */
    protected validateOrder(order: OpenOrder): void;
    /** @override */
    protected enoughPosition(order: OpenOrder): void;
    private enoughAvailable;
    /** @override */
    protected makeOpenOrder(order: OpenOrder): OpenOrder;
    /** @override */
    protected orderTakes(taker: OpenOrder): UnidentifiedTrade[];
    /** @override */
    protected orderMakes(openOrder: OpenOrder): void;
}
export { Texchange, Events, };
