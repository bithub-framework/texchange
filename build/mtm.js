"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMtm = exports.Mtm = void 0;
const startable_1 = require("startable");
class Mtm extends startable_1.Startable {
    constructor(context, models, settle) {
        super();
        this.context = context;
        this.models = models;
        this.settle = settle;
        this.involved = [
            ...this.settle.involved,
        ];
    }
}
exports.Mtm = Mtm;
class DefaultMtm extends Mtm {
    constructor(context, models, settle) {
        super(context, models, settle);
        this.context = context;
        this.models = models;
        this.settle = settle;
        this.involved = [
            ...super.involved,
        ];
    }
    async Startable$rawStart() { }
    async Startable$rawStop() { }
}
exports.DefaultMtm = DefaultMtm;
//# sourceMappingURL=mtm.js.map