import { Texchange as Parent, Events } from './4-equity.2-taken';
import { OpenOrder } from './interfaces';
declare abstract class Texchange extends Parent {
    protected clear(): void;
    /** @override */
    protected cancelOpenOrder(order: OpenOrder): OpenOrder;
}
export { Texchange, Events, };
