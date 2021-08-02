"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const _1_pushing_1 = require("./1-pushing");
const interfaces_1 = require("./interfaces");
const big_js_1 = require("big.js");
const assert = require("assert");
const open_maker_manager_1 = require("./managers/open-maker-manager");
class Texchange extends _1_pushing_1.Texchange {
    constructor(config, snapshot, now) {
        super(config, now);
        this.orderCount = 0;
        this.settlementPrice = config.initialSettlementPrice;
        this.latestPrice = config.initialLatestPrice;
        this.makers = new open_maker_manager_1.OpenMakerManager(config, snapshot.openMakers, () => this.settlementPrice, () => this.latestPrice);
    }
    makeOrders(orders) {
        return orders.map((order) => {
            try {
                const openOrder = {
                    ...order,
                    id: ++this.orderCount,
                    filled: new big_js_1.default(0),
                    unfilled: order.quantity,
                };
                this.validateOrder(openOrder);
                return this.makeOpenOrder(openOrder);
            }
            catch (err) {
                return err;
            }
        });
    }
    cancelOrders(orders) {
        return orders.map(order => this.cancelOpenOrder(order));
    }
    amendOrders(amendments) {
        return amendments.map((amendment) => {
            try {
                const { filled } = this.cancelOpenOrder(amendment);
                const openOrder = {
                    price: amendment.newPrice,
                    unfilled: amendment.newUnfilled,
                    quantity: amendment.newUnfilled.plus(filled),
                    filled,
                    id: amendment.id,
                    side: amendment.side,
                    length: amendment.length,
                    operation: amendment.operation,
                };
                this.validateOrder(openOrder);
                return this.makeOpenOrder(openOrder);
            }
            catch (err) {
                return err;
            }
        });
    }
    getOpenOrders() {
        return interfaces_1.clone([...this.makers.values()]);
    }
    /** @override */
    updateTrades(uTrades) {
        for (const uTrade of uTrades)
            assert(uTrade.time === this.now());
        this.pushUTrades(uTrades);
        for (let uTrade of uTrades) {
            this.settlementPrice = new big_js_1.default(0)
                .plus(this.settlementPrice.times(.9))
                .plus(uTrade.price.times(.1))
                .round(this.config.PRICE_DP);
            this.latestPrice = uTrade.price;
        }
    }
}
exports.Texchange = Texchange;
//# sourceMappingURL=2.1-interfaces.js.map