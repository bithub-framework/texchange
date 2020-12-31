# Texchange

## 特性

Texchange 是一个可配置的模拟交易所

- 模拟了网络延迟
- 模拟了你的 taker 对盘口的影响
- 可配置保证金算法

### Drawbacks

- 只支持一个账户
- 没有模拟你的 maker 对盘口的影响

## 保证金算法

均假设没有锁仓保证金优惠

### 商品期货交易所

每日结算

- 初始保证金：用订单价格算
- 占用保证金：结算前用订单价格算，结算后用结算价算
- 释放保证金：用平均订单价格算
- 维持保证金：结算前不用算，结算后用结算价算
- 冻结保证金：用订单价格算

```ts
function calcInitialMargin(
    config: MarketConfig & AccountConfig,
    order: LimitOrder,
    settlementPrice: Big,
): Big {
    return config.calcDollarVolume(
        order.price, order.quantity,
    ).div(config.leverage);
};
function calcIncreasedMargin(
    config: MarketConfig & AccountConfig,
    price: Big,
    volume: Big,
    settlementPrice: Big,
): Big {
    return config.calcDollarVolume(
        price, volume,
    ).div(config.leverage);
};
function calcDecreasedMargin(
    config: MarketConfig & AccountConfig,
    assets: ExAssets,
    volume: Big,
): Big {
    return assets.margin
        .div(totalPosition)
        .times(volume);
}
```

### OKEX 永续全仓

实时结算

- 初始保证金：用结算价算
- 占用保证金：用结算价算
- 维持保证金：用结算价算
- 冻结保证金：用订单价格算

```ts
function calcInitialMargin(
    config: MarketConfig & AccountConfig,
    order: LimitOrder,
    settlementPrice: Big,
): Big {
    return config.calcDollarVolume(
        settlementPrice, order.quantity,
    ).div(config.leverage);
};
function calcPositionMargin(
    config: MarketConfig & AccountConfig,
    assets: Omit<ExAssets, 'margin' | 'reserve'>,
    settlementPrice: Big,
    originalMargin: Big,
): Big {
    const totalPosition = assets.position[LONG].plus(assets.position[SHORT]);
    return settlementPrice
        .times(settlementPrice)
        .div(config.leverage);
}
```

### Binance 永续全仓

实时结算

- 初始保证金：用订单价格算
- 占用保证金：用订单价格算
- 释放保证金：用平均订单价格算
- 维持保证金：用订单价格算
- 冻结保证金：用订单价格算

```ts
function calcInitialMargin(
    config: MarketConfig & AccountConfig,
    order: LimitOrder,
    settlementPrice: Big,
): Big {
    return config.calcDollarVolume(
        order.price, order.quantity,
    ).div(config.leverage);
};
function calcIncreasedMargin(
    config: MarketConfig & AccountConfig,
    price: Big,
    volume: Big,
    settlementPrice: Big,
): Big {
    return config.calcDollarVolume(
        price, volume,
    ).div(config.leverage);
};
function calcDecreasedMargin(
    config: MarketConfig & AccountConfig,
    assets: ExAssets,
    volume: Big,
): Big {
    return assets.margin
        .div(totalPosition)
        .times(volume);
}
```
