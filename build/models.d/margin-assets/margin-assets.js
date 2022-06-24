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
exports.MarginAssets = void 0;
const secretary_like_1 = require("secretary-like");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../injection/default/types");
let MarginAssets = class MarginAssets {
    constructor(context, marketSpec, accountSpec, assets) {
        this.context = context;
        this.marketSpec = marketSpec;
        this.accountSpec = accountSpec;
        this.assets = assets;
        this.Margin = new MarginAssets.MarginStatic(context.Data.H);
        this.$accumulation = {
            [secretary_like_1.Length.LONG]: new context.Data.H(0),
            [secretary_like_1.Length.SHORT]: new context.Data.H(0),
        };
    }
    open({ length, volume, dollarVolume, }) {
        const increment = dollarVolume.div(this.accountSpec.LEVERAGE);
        this.$accumulation[length] = this.$accumulation[length]
            .plus(increment)
            .round(this.marketSpec.CURRENCY_DP);
        this.assets.open({ length, volume, dollarVolume });
    }
    close({ length, volume, dollarVolume, }) {
        if (volume.eq(this.assets.getPosition()[length])) {
            this.$accumulation[length] = new this.context.Data.H(0);
        }
        const decrement = this.$accumulation[length]
            .times(volume)
            .div(this.assets.getPosition()[length]);
        this.$accumulation[length] = this.$accumulation[length]
            .minus(decrement)
            .round(this.marketSpec.CURRENCY_DP);
        this.assets.close({ length, volume, dollarVolume });
    }
    capture() {
        return {
            assets: this.assets.capture(),
            margin: this.Margin.capture(this.$accumulation),
        };
    }
    restore(snapshot) {
        this.assets.restore(snapshot.assets);
        this.$accumulation = this.Margin.restore(snapshot.margin);
    }
    getPosition() {
        return this.assets.getPosition();
    }
    getBalance() {
        return this.assets.getBalance();
    }
    getCost() {
        return this.assets.getCost();
    }
    pay(fee) {
        this.assets.pay(fee);
    }
};
MarginAssets = __decorate([
    __param(0, (0, injektor_1.inject)(types_1.TYPES.context)),
    __param(1, (0, injektor_1.inject)(types_1.TYPES.marketSpec)),
    __param(2, (0, injektor_1.inject)(types_1.TYPES.accountSpec)),
    __param(3, (0, injektor_1.inject)(types_1.TYPES.MODELS.assets))
], MarginAssets);
exports.MarginAssets = MarginAssets;
(function (MarginAssets) {
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
    MarginAssets.MarginStatic = MarginStatic;
})(MarginAssets = exports.MarginAssets || (exports.MarginAssets = {}));
exports.MarginAssets = MarginAssets;
//# sourceMappingURL=margin-assets.js.map