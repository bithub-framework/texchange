import { Texchange as Parent, Events } from './3-taken';
import { UnidentifiedTrade, OpenOrder } from './interfaces';
import { AssetsManager } from './managers/assets-manager';
declare abstract class Texchange extends Parent {
    protected abstract assets: AssetsManager;
    protected abstract pushPositionsAndBalances(): void;
    protected abstract settle(): void;
    /** @override */
    protected validateOrder(order: OpenOrder): void;
    private enoughPosition;
    private singleLength;
    private enoughAvailable;
    /** @override */
    protected makeOpenOrder(order: OpenOrder): OpenOrder;
    /** @override */
    protected orderTakes(taker: OpenOrder): UnidentifiedTrade[];
    /** @override */
    protected orderMakes(openOrder: OpenOrder): void;
}
export { Texchange, Events, };
