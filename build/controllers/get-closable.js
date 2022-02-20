"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetClosable = void 0;
const interfaces_1 = require("../interfaces");
class GetClosable {
    constructor(context, models) {
        this.context = context;
        this.models = models;
        this.involved = [
            this.models.assets,
            this.models.makers,
        ];
    }
    getClosable() {
        const { assets, makers } = this.models;
        return {
            [interfaces_1.Length.LONG]: assets.position[interfaces_1.Length.LONG]
                .minus(makers.totalFrozen.position[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: assets.position[interfaces_1.Length.SHORT]
                .minus(makers.totalFrozen.position[interfaces_1.Length.SHORT]),
        };
    }
}
exports.GetClosable = GetClosable;
//# sourceMappingURL=get-closable.js.map