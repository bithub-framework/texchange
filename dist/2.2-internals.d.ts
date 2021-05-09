import { OpenOrder, UnidentifiedTrade } from './interfaces';
import { Texchange as Parent, Events } from './2.1-externals';
declare class Texchange extends Parent {
    protected makeOpenOrder(order: OpenOrder): OpenOrder;
    protected validateOrder(order: OpenOrder): void;
    protected formatCorrect(order: OpenOrder): void;
    protected orderTakes(taker: OpenOrder): UnidentifiedTrade[];
    protected orderMakes(openOrder: OpenOrder): void;
    protected cancelOpenOrder(order: OpenOrder): OpenOrder;
}
export { Texchange, Events, };
