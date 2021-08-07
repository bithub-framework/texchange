import {
    Core as Parent,
    Events,
} from './4-equity.2-taken';
import {
    OpenOrder,
    clone,
    Length,
} from './interfaces';
import Big from 'big.js';

abstract class Core extends Parent {
    protected settle(): void {
        const position = clone(this.equity.position);
        for (const length of [Length.LONG, Length.SHORT] as const) {
            const clearingDollarVolume =
                this.config.calcDollarVolume(
                    this.markPrice,
                    position[length],
                ).round(this.config.CURRENCY_DP);
            this.equity.closePosition(
                length,
                position[length],
                clearingDollarVolume,
                new Big(0),
            );
            this.equity.openPosition(
                length,
                position[length],
                clearingDollarVolume,
                new Big(0),
            );
        }
    }

    /** @override */
    protected cancelOpenOrder(order: OpenOrder): OpenOrder {
        const filled = this.makers.get(order.id)?.filled || order.quantity;
        this.makers.removeOrder(order.id);
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
}

export {
    Core,
    Events,
}
