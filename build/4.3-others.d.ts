import { Texchange as Parent, Events } from './4.2-taken';
import { OpenOrder } from './interfaces';
declare abstract class Texchange extends Parent {
    protected settle(): void;
    /** @override */
    protected cancelOpenOrder(order: OpenOrder): OpenOrder;
}
export { Texchange, Events, };
