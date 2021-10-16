import {
    OpenOrder,
} from '../interfaces';
import { Core } from '../core';


export class MethodsOrdering {
    constructor(
        private core: Core,
    ) { }

    public cancelOpenOrder(order: OpenOrder): OpenOrder {
        const { makers } = this.core.states;

        const filled = makers.get(order.id)?.filled || order.quantity;
        const toThaw = makers.removeOrder(order.id);
        if (toThaw) this.core.states.margin.thaw(toThaw);
        return {
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: order.id,
            filled,
            unfilled: order.quantity.minus(filled),
        };
    }

    public makeOpenOrder(order: OpenOrder): OpenOrder {
        const trades = this.core.taking.orderTakes(order);
        this.core.making.orderMakes(order);
        if (trades.length) {
            this.core.interfaces.instant.pushTrades(trades);
            this.core.interfaces.instant.pushOrderbook();
            this.core.states.mtm.updateTrades(trades);
            this.core.interfaces.instant.pushPositionsAndBalances();
        }
        return order;
    }
}
