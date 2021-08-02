"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const _4_assets_1 = require("./4-assets");
const open_maker_manager_1 = require("./state-managers/open-maker-manager");
const assets_manager_1 = require("./state-managers/assets-manager");
class Texchange extends _4_assets_1.Texchange {
    constructor(config, snapshot, now) {
        super(config, now);
        this.makers = new open_maker_manager_1.OpenMakerManager(config, snapshot.openMakers, () => this.settlementPrice, () => this.latestPrice);
        this.assets = new assets_manager_1.AssetsManager(config, snapshot.assets, () => this.settlementPrice, () => this.latestPrice);
    }
    // TODO 考虑现货
    capture() {
        return {
            time: this.now(),
            openMakers: this.makers.capture(),
            assets: this.assets.capture(),
        };
    }
}
exports.Texchange = Texchange;
//# sourceMappingURL=5-snapshot.js.map