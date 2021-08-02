"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const _5_margin_3_others_1 = require("./5-margin.3-others");
const open_maker_manager_1 = require("./state-managers/open-maker-manager");
const equity_manager_1 = require("./state-managers/equity-manager");
const main_1 = require("./state-managers/margin-manager/main");
class Texchange extends _5_margin_3_others_1.Texchange {
    constructor(config, snapshot, now) {
        super(config, now);
        this.makers = new open_maker_manager_1.OpenMakerManager(config, snapshot.openMakers, () => this.clearingPrice, () => this.latestPrice);
        this.equity = new equity_manager_1.EquityManager(config, snapshot.equity);
        this.margin = new main_1.MarginManager(config, snapshot.margin, () => this.clearingPrice, () => this.latestPrice, this.equity);
    }
    // TODO 考虑现货
    capture() {
        return {
            time: this.now(),
            openMakers: this.makers.capture(),
            equity: this.equity.capture(),
            margin: this.margin.capture(),
        };
    }
}
exports.Texchange = Texchange;
//# sourceMappingURL=6-snapshot.js.map