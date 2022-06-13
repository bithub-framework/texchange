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
exports.Margins = void 0;
const secretary_like_1 = require("secretary-like");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../injection/types");
let Margins = class Margins {
    constructor(context) {
        this.context = context;
        this.Margin = new Margins.MarginStatic(this.context.Data.H);
        this.$margin = {
            [secretary_like_1.Length.LONG]: new this.context.Data.H(0),
            [secretary_like_1.Length.SHORT]: new this.context.Data.H(0),
        };
    }
    getMargin() {
        return this.Margin.copy(this.$margin);
    }
    setMargin(length, marginNumber) {
        this.$margin[length] = marginNumber;
    }
    capture() {
        return this.Margin.capture(this.$margin);
    }
    restore(snapshot) {
        this.$margin = this.Margin.restore(snapshot);
    }
};
Margins = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.Context))
], Margins);
exports.Margins = Margins;
(function (Margins) {
    class MarginStatic {
        constructor(H) {
            this.H = H;
        }
        capture(margin) {
            return {
                [secretary_like_1.Length.LONG]: this.H.capture(margin[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: this.H.capture(margin[secretary_like_1.Length.SHORT]),
            };
        }
        restore(snapshot) {
            return {
                [secretary_like_1.Length.LONG]: this.H.restore(snapshot[secretary_like_1.Length.LONG]),
                [secretary_like_1.Length.SHORT]: this.H.restore(snapshot[secretary_like_1.Length.SHORT]),
            };
        }
        copy(margin) {
            return {
                [secretary_like_1.Length.LONG]: margin[secretary_like_1.Length.LONG],
                [secretary_like_1.Length.SHORT]: margin[secretary_like_1.Length.SHORT],
            };
        }
    }
    Margins.MarginStatic = MarginStatic;
})(Margins = exports.Margins || (exports.Margins = {}));
exports.Margins = Margins;
//# sourceMappingURL=margins.js.map