"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMtm = void 0;
const mtm_1 = require("./mtm");
const injektor_1 = require("@zimtsui/injektor");
// 默认永不结算
let DefaultMtm = class DefaultMtm extends mtm_1.Mtm {
    async rawStart() { }
    async rawStop() { }
};
DefaultMtm = __decorate([
    (0, injektor_1.injextends)()
], DefaultMtm);
exports.DefaultMtm = DefaultMtm;
(function (DefaultMtm) {
    DefaultMtm.ModelDeps = {};
    DefaultMtm.TaskDeps = {};
})(DefaultMtm = exports.DefaultMtm || (exports.DefaultMtm = {}));
exports.DefaultMtm = DefaultMtm;
//# sourceMappingURL=default.js.map