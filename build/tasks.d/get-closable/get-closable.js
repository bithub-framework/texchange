"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetClosable = void 0;
const injektor_1 = require("injektor");
const interfaces_1 = require("interfaces");
class GetClosable {
    constructor(context, models, broadcast) {
        this.context = context;
        this.models = models;
        this.broadcast = broadcast;
    }
    getClosable() {
        const { assets, makers } = this.models;
        const totalFrozen = makers.getTotalFrozen();
        const position = assets.getPosition();
        return {
            [interfaces_1.Length.LONG]: position[interfaces_1.Length.LONG]
                .minus(totalFrozen.position[interfaces_1.Length.LONG]),
            [interfaces_1.Length.SHORT]: position[interfaces_1.Length.SHORT]
                .minus(totalFrozen.position[interfaces_1.Length.SHORT]),
        };
    }
}
GetClosable.TaskDeps = {};
__decorate([
    (0, injektor_1.inject)(GetClosable.TaskDeps)
], GetClosable.prototype, "tasks", void 0);
exports.GetClosable = GetClosable;
//# sourceMappingURL=get-closable.js.map