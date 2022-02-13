"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountView = void 0;
const interfaces_1 = require("../interfaces");
class AccountView {
    constructor(hub) {
        this.hub = hub;
    }
    getAvailable() {
        return this.hub.models.assets.balance
            .minus(this.hub.context.calculation.finalMargin())
            .minus(this.hub.context.calculation.finalFrozenBalance())
            .round(this.hub.context.config.CURRENCY_DP);
    }
    getClosable() {
        const { assets, makers } = this.hub.models;
        return {
            [interfaces_1.Length.LONG]: assets.position[interfaces_1.Length.LONG]
                .minus(makers.totalFrozen.position[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: assets.position[interfaces_1.Length.SHORT]
                .minus(makers.totalFrozen.position[interfaces_1.Length.SHORT]),
        };
    }
}
exports.AccountView = AccountView;
//# sourceMappingURL=account-view.js.map