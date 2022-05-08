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
const assets_1 = require("./models.d/assets");
const margins_1 = require("./models.d/margins");
const book_1 = require("./models.d/book");
const progress_1 = require("./models.d/progress");
const injektor_1 = require("injektor");
const types_1 = require("./injection/types");
let Models = class Models {
    constructor(context, makers, pricing) {
        this.makers = makers;
        this.pricing = pricing;
        this.assets = new assets_1.Assets(context);
        this.margins = new margins_1.Margins(context);
        this.book = new book_1.Book(context);
        this.progress = new progress_1.Progress(context);
    }
};
Models = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.Context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.Makers)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.Pricing))
], Models);
exports.Models = Models;
//# sourceMappingURL=models.js.map