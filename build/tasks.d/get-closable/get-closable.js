"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetClosable = void 0;
const secretary_like_1 = require("secretary-like");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../injection/types");
let GetClosable = class GetClosable {
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
            [secretary_like_1.Length.LONG]: position[secretary_like_1.Length.LONG]
                .minus(totalFrozen.position[secretary_like_1.Length.LONG]),
            [secretary_like_1.Length.SHORT]: position[secretary_like_1.Length.SHORT]
                .minus(totalFrozen.position[secretary_like_1.Length.SHORT]),
        };
    }
};
__decorate([
    (0, injektor_1.instantInject)(types_1.TYPES.Tasks)
], GetClosable.prototype, "tasks", void 0);
GetClosable = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.Context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.Models)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.Broadcast))
], GetClosable);
exports.GetClosable = GetClosable;
//# sourceMappingURL=get-closable.js.map