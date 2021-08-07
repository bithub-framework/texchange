import { Core as Parent, Events } from './4-equity.3-others';
import { UnidentifiedTrade, OpenOrder } from './interfaces';
import { MarginManager } from './state-managers/margin-manager/main';
declare abstract class Core extends Parent {
    protected abstract pushPositionsAndBalances(): void;
    protected abstract margin: MarginManager;
    /** @override */
    protected validateOrder(order: OpenOrder): void;
    /** @override */
    protected assertEnoughPosition(order: OpenOrder): void;
    private assertEnoughAvailable;
    /** @override */
    protected makeOpenOrder(order: OpenOrder): OpenOrder;
    /** @override */
    protected orderTakes(taker: OpenOrder): UnidentifiedTrade[];
    /** @override */
    protected orderMakes(openOrder: OpenOrder): void;
}
export { Core, Events, };
