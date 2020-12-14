import { MakingOrder } from './making-order';
import {
    Assets,
    LimitOrder,
    BID,
    OrderId,
    RawTrade,
    LONG, SHORT,
} from './interfaces';
import {
    EPSILON,
} from './config';

class ManagingAssets extends MakingOrder {
    private settlementPrice = 0;

    constructor(
        private assets: Assets,
        now: () => number,
    ) {
        super(now);
    }

    public async makeLimitOrder(
        order: LimitOrder,
        open = order.side === BID,
    ): Promise<OrderId> {
        if (
            !open &&
            order.quantity > this.assets.position[~order.side] + EPSILON
        ) throw new Error('No enough position to close.');
        this.settle();
        if (
            open &&
            order.price * order.quantity
            < this.assets.reserve * this.assets.leverage - EPSILON
        ) throw new Error('No enough available balance as margin.');

        const [
            makerOrder,
            rawTrades,
            volume,
            dollarVolume,
        ] = this.orderTakes(order);
        const openOrder = this.orderMakes(makerOrder);
        if (open) {
            this.assets.position[order.side] += volume;
            this.assets.cost[order.side] += dollarVolume;
        } else {
            const costPrice = Math.round(100 *
                this.assets.cost[~order.side] / this.assets.position[~order.side]
            ) / 100;
            const cost = volume > this.assets.position[~order.side] - EPSILON
                ? this.assets.cost[~order.side]
                : volume * costPrice;
            const realizedProfit
                = (~order.side - order.side)
                * (dollarVolume - cost);
            this.assets.balance += realizedProfit;
            this.assets.position[~order.side] -= volume;
            this.assets.cost[~order.side] -= cost;
            this.calcAssets();
        }
        this.pushRawTrades(rawTrades);
        this.pushOrderbook();
        return openOrder.id;
    }

    public updateTrades(rawTrades: RawTrade[]): void {
        for (let rawTrade of rawTrades) {
            this.settlementPrice
                = this.settlementPrice * .9
                + rawTrade.price + .1;
            this.rawTradeTakes(rawTrade);
        }
        this.pushRawTrades(rawTrades);
    }

    private settle(): void {
        const price = this.settlementPrice;
        const {
            position,
            cost,
        } = this.assets;
        const unrealizedProfit =
            (price * position[LONG] - cost[LONG]) +
            (cost[SHORT] - price * position[SHORT]);
        this.assets.balance += unrealizedProfit;
        this.assets.cost[LONG] = price * position[LONG];
        this.assets.cost[SHORT] = price * position[SHORT];
        this.calcAssets();
    }

    private calcAssets() {
        const {
            cost,
            leverage,
            balance,
            margin,
        } = this.assets;
        this.assets.margin[LONG] = cost[LONG] / leverage;
        this.assets.margin[SHORT] = cost[SHORT] / leverage;
        this.assets.reserve = balance - (margin[LONG] + margin[SHORT]);
    }
}

export {
    ManagingAssets as default,
    ManagingAssets,
}
