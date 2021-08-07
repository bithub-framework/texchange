import { OpenOrder, UnidentifiedTrade } from './interfaces';
import { Core as Parent, Events } from './2-ordering.1-interfaces';
declare abstract class Core extends Parent {
    protected makeOpenOrder(order: OpenOrder): OpenOrder;
    protected validateOrder(order: OpenOrder): void;
    protected formatCorrect(order: OpenOrder): void;
    protected orderTakes(taker: OpenOrder): UnidentifiedTrade[];
    protected orderMakes(openOrder: OpenOrder): void;
    protected cancelOpenOrder(order: OpenOrder): OpenOrder;
}
export { Core, Events, };
