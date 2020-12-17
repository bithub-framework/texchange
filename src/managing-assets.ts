import { MakingOrder } from './making-order';
import {
    Assets,
    LimitOrder,
    OrderId,
    RawTrade,
    Side,
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

    protected openPosition(
        side: Side,
        volume: number,
        dollarVolume: number
    ): void {
        this.assets.position[side] += volume;
        this.assets.cost[side] += dollarVolume;
    }

    protected closePosition(
        side: Side,
        volume: number,
        dollarVolume: number
    ): void {
        const costPrice = Math.round(100 *
            this.assets.cost[1 - side] / this.assets.position[1 - side]
        ) / 100;
        const cost = volume > this.assets.position[1 - side] - EPSILON
            ? this.assets.cost[1 - side]
            : volume * costPrice;
        const realizedProfit
            = (1 - side - side)
            * (dollarVolume - cost);
        this.assets.balance += realizedProfit;
        this.assets.position[1 - side] -= volume;
        this.assets.cost[1 - side] -= cost;
        this.calcAssets();
    }

    public async makeLimitOrder(order: LimitOrder): Promise<OrderId> {
        if (
            !order.open &&
            order.quantity > this.assets.position[1 - order.side] + EPSILON
        ) throw new Error('No enough position to close.');
        this.settle();
        if (
            order.open &&
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
        if (order.open)
            this.openPosition(order.side, volume, dollarVolume);
        else
            this.closePosition(order.side, volume, dollarVolume);
        this.pushRawTrades(rawTrades);
        this.pushOrderbook();
        return openOrder.id;
    }

    public async getAssets(): Promise<Assets> {
        this.settle();
        return this.assets;
    }

    public updateTrades(rawTrades: RawTrade[]): void {
        for (let rawTrade of rawTrades) {
            this.settlementPrice
                = this.settlementPrice * .9
                + rawTrade.price + .1;
            this.rawTradeTakesOpenOrders(rawTrade);
        }
        this.pushRawTrades(rawTrades);
    }

    protected rawTradeTakesOpenOrders(_rawTrade: RawTrade) {
        const rawTrade: RawTrade = { ..._rawTrade };
        for (const order of this.openOrders.values())
            if (this.rawTradeShouldTakeOpenOrder(rawTrade, order)) {
                const volume = this.rawTradeTakesOpenOrder(rawTrade, order);
                if (order.open)
                    this.openPosition(order.side, volume, volume * order.price);
                else
                    this.closePosition(order.side, volume, volume * order.price);
            }
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
