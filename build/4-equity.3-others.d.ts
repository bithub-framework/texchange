import { Core as Parent, Events } from './4-equity.2-taken';
import { OpenOrder } from './interfaces';
declare abstract class Core extends Parent {
    protected settle(): void;
    /** @override */
    protected cancelOpenOrder(order: OpenOrder): OpenOrder;
}
export { Core, Events, };
