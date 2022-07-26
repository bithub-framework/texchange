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
const margin_1 = require("./margin");
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("../../injection/default/types");
let MarginAssets = class MarginAssets {
    constructor(context, marketSpec, accountSpec, assets) {
        this.context = context;
        this.marketSpec = marketSpec;
        this.accountSpec = accountSpec;
        this.assets = assets;
        this.marginFactory = new margin_1.MarginFactory(context.Data.hFactory);
        this.$margin = new margin_1.Margin(context.Data.hFactory.from(0), context.Data.hFactory.from(0));
    }
    open({ length, volume, dollarVolume, }) {
        const increment = dollarVolume.div(this.accountSpec.LEVERAGE);
        this.$margin.set(length, this.$margin.get(length)
            .plus(increment)
            .round(this.marketSpec.CURRENCY_DP));
        this.assets.open({ length, volume, dollarVolume });
    }
    close({ length, volume, dollarVolume, }) {
        if (volume.eq(this.assets.getPosition().get(length))) {
            this.$margin.set(length, this.context.Data.hFactory.from(0));
        }
        const decrement = this.$margin.get(length)
            .times(volume)
            .div(this.assets.getPosition().get(length));
        this.$margin.set(length, this.$margin.get(length)
            .minus(decrement)
            .round(this.marketSpec.CURRENCY_DP));
        this.assets.close({ length, volume, dollarVolume });
    }
    capture() {
        return {
            assets: this.assets.capture(),
            margin: this.marginFactory.capture(this.$margin),
        };
    }
    restore(snapshot) {
        this.assets.restore(snapshot.assets);
        this.$margin = this.marginFactory.restore(snapshot.margin);
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
//# sourceMappingURL=margin-assets.js.map