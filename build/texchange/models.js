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
exports.Models = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let Models = class Models {
    constructor(makers, pricing, assets, margins, book, progress) {
        this.makers = makers;
        this.pricing = pricing;
        this.assets = assets;
        this.margins = margins;
        this.book = book;
        this.progress = progress;
    }
};
Models = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.MODELS.Makers)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.MODELS.Pricing)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.MODELS.Assets)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.MODELS.Margins)),
    __param(4, (0, injektor_1.inject)(types_1.TYPES.MODELS.Book)),
    __param(5, (0, injektor_1.inject)(types_1.TYPES.MODELS.Progress))
], Models);
exports.Models = Models;
//# sourceMappingURL=models.js.map