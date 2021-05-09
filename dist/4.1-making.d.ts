import { Texchange as Parent, Events } from './3-taken';
import { UnidentifiedTrade, Config, OpenOrder, Snapshot } from './interfaces';
import { AssetsManager } from './manager-assets';
declare abstract class Texchange extends Parent {
    protected assets: AssetsManager;
    protected abstract pushPositionsAndBalances(): Promise<void>;
    protected abstract settle(): void;
    constructor(config: Config, snapshot: Snapshot, now: () => number);
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
