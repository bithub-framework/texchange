"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const _4_assets_1 = require("./4-assets");
class Texchange extends _4_assets_1.Texchange {
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