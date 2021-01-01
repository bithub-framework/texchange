# Texchange

## 特性

Texchange 是一个可配置的模拟交易所

- 模拟了网络延迟
- 模拟了你的 taker 对盘口的影响
- 可配置保证金算法

### Drawbacks

- 只支持一个账户
- 没有模拟你的 maker 对盘口的影响
- 没有模拟锁仓优惠
- 没有模拟强制平仓

## 配置

`./src/interfaces.ts` 中 `Config` 接口描述了 Texchange 的配置。

Texchange 的配置继承了 [BitHub 通用配置](https://github.com/bithub-framework/interfaces)，但你还需要配置更多来描述模拟交易所应该如何运行。

- `calcInitialMargin` 描述了如何计算初始保证金。
- `calcIncreasedMargin` 描述了如何计算开仓保证金。
- `calcDecreasedMargin` 描述了如何计算平仓保证金。
- `calcPositionMargin` 描述了如何计算持仓保证金。

详见下文

## 保证金算法配置

### 术语定义

- 初始保证金：一个开仓订单初始保证金是指，没被占用的余额小于这个数就不让下单。
- 持仓保证金：一个时刻的持仓保证金是指，此时刻的持仓所占用的余额。
- 维持保证金：一个时刻的维持保证金是指，如果这个时刻的余额小于这个数就会自动强平。
- 冻结保证金：订单未成交的部分即成为 maker 的部分所占用的余额。

### 不同交易所的结算周期

商品期货交易所通常是每日结算。比特币交易所通常是实时结算，每个时刻都有一个新的结算价，例如

- 火币，虽然名义上是每日结算，但结算前用最新价格计算的浮动盈亏可以用来开仓，所以本质上相当于以最新价格作为结算价实时结算。
- Binance，虽然名义上是不结算，但以标记价格计算的浮动盈亏实时计入了余额，所以本质上相当于以标记价格实时结算。
- OKEX，虽然名义上是每日结算，但结算前用最新价格计算的浮动盈亏可以用来开仓，所以本质上相当于以最新价格作为结算价实时结算。

### 不同交易所的保证金算法

不同交易所的保证金算法差别很大。举几个例子

- Binance 永续全仓
    - 实时结算，以标记价格作为结算价
    - 初始保证金用委托价算
    - 持仓保证金用委托价算，平仓时减少的持仓保证金用单位头寸的平均持仓保证金算
    - 冻结保证金用委托价算
- OKEX 永续全仓
    - 实时结算，以标记价格作为结算价
    - 初始保证金用最新价格算
    - 持仓保证金用结算价算
    - 冻结保证金用委托价算
- 火币永续全仓
    - 实时结算，以最新价格作为结算价
    - 初始保证金用委托价算
    - 持仓保证金用结算价算
    - 冻结保证金用委托价算
- 传统期货交易所
    - 每日结算
    - 初始保证金用委托价算
    - 持仓保证金在结算前用委托价算，结算后用结算价算
    - 冻结保证金用委托价算

OKEX 和火币的保证金算法复杂也就算了，最关键的是文档里居然不写，这些都是我辛辛苦苦找客服一个个问出来的。

### 配置各个保证金算法

- 在每次开仓和平仓时，用你提供的 `calcIncreasedMargin` 和 `calcDecreasedMargin` 计算开仓保证金和平仓保证金并统计到持仓保证金中
- 在每一次读取持仓保证金时，用你提供的 `calcPositionMargin` 计算持仓保证金

### 商品期货交易所

- 结算周期：每日结算
- 初始保证金：用订单价格算
- 持仓保证金：结算前用订单价格算，结算后用结算价算
- 平仓保证金：用平均订单价格算
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
    return new Big(0);
};
function calcDecreasedMargin(
    config: MarketConfig & AccountConfig,
    assets: ExAssets,
    volume: Big,
): Big {
    return new Big(0);
}
function calcPositionMargin(
    config: MarketConfig & AccountConfig,
    assets: Omit<ExAssets, 'margin' | 'reserve'>,
    settlementPrice: Big,
    originalMargin: Big,
): Big {
    const cost = this.assets.cost[LONG].plus(this.assets.cost[SHORT]);
    return cost.div(config.leverage);
}
```

### OKEX 永续全仓

- 结算周期：实时结算
- 初始保证金：用结算价算
- 持仓保证金：用结算价算
- 维持保证金：用结算价算
- 冻结保证金：用结算价算，不随结算价变化

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
function calcIncreasedMargin(
    config: MarketConfig & AccountConfig,
    price: Big,
    volume: Big,
    settlementPrice: Big,
): Big {
    return new Big(0);
};
function calcDecreasedMargin(
    config: MarketConfig & AccountConfig,
    assets: ExAssets,
    volume: Big,
): Big {
    return new Big(0);
}
function calcPositionMargin(
    config: MarketConfig & AccountConfig,
    assets: Omit<ExAssets, 'margin' | 'reserve'>,
    settlementPrice: Big,
    originalMargin: Big,
): Big {
    const totalPosition = assets.position[LONG].plus(assets.position[SHORT]);
    return totalPosition
        .times(settlementPrice)
        .div(config.leverage);
}
```

OKEX 永续全仓的结算周期是实时结算，因此结算价时刻都在变化。而持仓保证金使用结算价计算，因此持仓保证金也时刻都在随结算价变化。

### Binance 永续全仓

实时结算

- 初始保证金：用订单价格算
- 开仓保证金：用订单价格算
- 平仓保证金：用平均订单价格算
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
function calcPositionMargin(
    config: MarketConfig & AccountConfig,
    assets: Omit<ExAssets, 'margin' | 'reserve'>,
    settlementPrice: Big,
    originalMargin: Big,
): Big {
    const originalMargin;
}
```
