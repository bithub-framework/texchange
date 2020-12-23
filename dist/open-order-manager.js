import Big from 'big.js';
class OpenOrderManager {
    constructor(config) {
        this.config = config;
        this.openOrders = new Map();
        this.freezeInfos = new Map();
    }
    create(oid, limit) {
        const order = { ...limit, id: oid };
        if (order.quantity.eq(0))
            return [
                order,
                {
                    margin: new Big(0),
                    fee: new Big(0),
                    position: new Big(0),
                    length: order.open ? order.side : -order.side,
                }
            ];
        this.openOrders.set(oid, order);
        const dollarVolume = this.config.calcDollarVolume(order.price, order.quantity);
        const info = {
            margin: order.open
                ? dollarVolume.div(this.config.leverage)
                    .round(this.config.CURRENCY_DP, 3 /* RoundUp */)
                : new Big(0),
            fee: dollarVolume.times(this.config.MAKER_FEE)
                .round(this.config.CURRENCY_DP, 3 /* RoundUp */),
            position: order.open
                ? new Big(0)
                : order.quantity,
            length: order.open ? order.side : -order.side,
        };
        this.freezeInfos.set(oid, info);
        return [order, info];
    }
    take(oid, volume, dollarVolume) {
        const order = this.openOrders.get(oid);
        const oldInfo = this.freezeInfos.get(oid);
        if (!order)
            throw ('Order not found.');
        order.quantity = order.quantity.minus(volume);
        const info = {
            margin: this.releaseMargin(order, oldInfo, volume, dollarVolume),
            fee: this.releaseFee(order, oldInfo, volume, dollarVolume),
            position: this.releasePosition(order, oldInfo, volume, dollarVolume),
            length: order.open ? order.side : -order.side,
        };
        if (order.quantity.eq(0)) {
            this.openOrders.delete(oid);
            this.freezeInfos.delete(oid);
        }
        return oldInfo;
    }
    delete(oid) {
        const order = this.openOrders.get(oid);
        const oldInfo = this.freezeInfos.get(oid);
        if (!order)
            throw ('Order not found.');
        const info = {
            margin: this.releaseMargin(order, oldInfo, order.quantity, oldInfo.margin),
            fee: this.releaseFee(order, oldInfo, order.quantity, oldInfo.margin),
            position: this.releasePosition(order, oldInfo, order.quantity, oldInfo.margin),
            length: order.open ? order.side : -order.side,
        };
        this.openOrders.delete(oid);
        this.freezeInfos.delete(oid);
        return info;
    }
    getOpenOrders() {
        return this.openOrders;
    }
    releaseMargin(order, info, volume, dollarVolume) {
        let releasedMargin = dollarVolume.div(this.config.leverage)
            .round(this.config.CURRENCY_DP);
        if (releasedMargin.gt(info.margin) ||
            volume.eq(order.quantity))
            releasedMargin = info.margin;
        info.margin = info.margin.minus(releasedMargin);
        // this.frozenMargin = this.frozenMargin.minus(releasedMargin);
        return releasedMargin;
    }
    releaseFee(order, info, volume, dollarVolume) {
        let releasedFee = dollarVolume.times(this.config.MAKER_FEE)
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */);
        if (releasedFee.gt(info.fee) ||
            volume.eq(order.quantity))
            releasedFee = info.fee;
        info.fee = info.fee.minus(releasedFee);
        // this.frozenFee = this.frozenFee.minus(releasedFee);
        return releasedFee;
    }
    releasePosition(order, info, volume, dollarVolume) {
        let releasedPosition = volume;
        if (releasedPosition.gt(info.position))
            releasedPosition = info.position;
        info.position = info.position.minus(releasedPosition);
        // this.frozenPosition[-order.side] = this.frozenPosition[-order.side]
        //     .minus(releasedPosition);
        return releasedPosition;
    }
}
export { OpenOrderManager as default, OpenOrderManager, };
//# sourceMappingURL=open-order-manager.js.map