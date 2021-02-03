# Texchange

## 特性

Texchange 是一个可配置的模拟交易所

- 模拟了网络延迟
- 模拟了服务器处理时间
- 模拟了你的 taker 对盘口的影响
- 模拟了你的 maker 在盘口相同价格订单中的排队
- 可配置正反向合约
- 可配置保证金算法

### Drawbacks

- 只支持一个账户
- 没有模拟你的 maker 对盘口的影响
- 没有模拟锁仓优惠
- 没有模拟强制平仓
- 不支持单向头寸模式
- 不支持逐仓模式

## 配置

`./src/interfaces.ts` 中 `Config` 接口描述了 Texchange 的配置。

Texchange 的配置继承了 [BitHub 通用的市场配置和账户配置](https://github.com/bithub-framework/interfaces)，但你还需要配置更多来描述模拟交易所应该如何运行。

- `calcInitialMargin` 描述了如何计算初始保证金。
- `calcMarginIncrement` 描述了如何计算开仓增加的保证金。
- `calcMarginDecrement` 描述了如何计算平仓减少的保证金。
- `calcMargin` 描述了如何计算保证金。
- `calcFrozenMargin` 描述了如何计算冻结保证金。

详见下文

## 配置保证金算法

### 术语定义

广义的*保证金*可以指

- 初始保证金：一个开仓订单初始保证金是指，没被占用的余额小于这个数就不让下单。
- 持仓保证金：一个时刻的保证金是指，此时刻的持仓所占用的余额。
- 维持保证金：一个时刻的维持保证金是指，如果这个时刻的余额小于这个数就会自动强平。
- 冻结保证金：订单未成交的部分即成为 maker 的部分所占用的余额。

狭义的*保证金*就是指*持仓保证金*。

### 不同衍生品的结算周期

商品期货通常是每日结算。比特币合约通常是实时结算，每个时刻都有一个新的结算价，例如

- 火币永续合约，虽然名义上是每日结算，但结算前用最新价格计算得出的浮动盈亏可以用来开仓，所以本质上相当于以最新价格作为结算价实时结算。
- Binance 永续合约，虽然名义上是不结算，但以标记价格计算得出的浮动盈亏实时计入了余额，所以本质上相当于以标记价格实时结算。
- OKEX 永续合约，虽然名义上是每日结算，但结算前用最新价格计算得出的浮动盈亏可以用来开仓，所以本质上相当于以最新价格作为结算价实时结算。

### 不同衍生品的保证金算法

不同衍生品的保证金算法差别很大，例如

- Binance 永续全仓
    - 实时结算，以标记价格作为结算价
    - 初始保证金用委托价算
    - 持仓保证金用委托价算，平仓时减少的持仓保证金用所有头寸的平均持仓保证金算
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
- 商品期货
    - 每日结算
    - 初始保证金用委托价算
    - 持仓保证金在结算前用委托价算，结算后用结算价算
    - 冻结保证金用委托价算

OKEX 和火币的保证金算法复杂也就算了，最关键的是文档里居然不写，这些都是我辛辛苦苦找客服一个个问出来的。

### 配置各个保证金算法

Texchange 会在每次开仓和平仓时调用你的 `calcMarginIncrement` 和 `calcMarginDecrement` 计算持仓保证金增量并自动统计，在每次读取持仓保证金时调用你的 `calcMargin` 来修正统计值。

有的衍生品，比如 Binance 永续全仓，持仓保证金是每次开仓平仓时计算并统计出来的，你需要提供 `calcMarginIncrement` 和 `calcMarginDecrement`。而 `calcMargin` 只需要直接输出统计值就行了。

还有的衍生品，比如 OKEX 永续全仓，持仓保证金是用当前结算价直接算出来的，所以你需要提供 `calcMargin`。而 `calcMarginIncrement` 和 `calcMarginDecrement` 随便输出一个数就行，比如 0。

#### 商品期货

```ts
function calcMarginIncrement(
    config: MarketConfig & AccountConfig,
    price: Big,
    volume: Big,
): Big {
    return new Big(0);
};
function calcMarginDecrement(
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
    latestPrice: Big,
    autoMargin: Big,
): Big {
    const cost = this.assets.cost[LONG].plus(this.assets.cost[SHORT]);
    return cost.div(config.leverage);
}
```

#### OKEX 永续全仓

```ts
function calcMarginIncrement(
    config: MarketConfig & AccountConfig,
    price: Big,
    volume: Big,
): Big {
    return new Big(0);
};
function calcMarginDecrement(
    config: MarketConfig & AccountConfig,
    assets: ExAssets,
    volume: Big,
): Big {
    return new Big(0);
}
function calcMargin(
    config: MarketConfig & AccountConfig,
    assets: Omit<ExAssets, 'margin' | 'reserve'>,
    settlementPrice: Big,
    latestPrice: Big,
    autoMargin: Big,
): Big {
    const totalPosition = assets.position[LONG].plus(assets.position[SHORT]);
    return totalPosition
        .times(settlementPrice)
        .div(config.leverage);
}
```

#### Binance 永续全仓

```ts
function calcMarginIncrement(
    config: MarketConfig & AccountConfig,
    price: Big,
    volume: Big,
): Big {
    return config.calcDollarVolume(
        price, volume,
    ).div(config.leverage);
};
function calcMarginDecrement(
    config: MarketConfig & AccountConfig,
    assets: ExAssets,
    volume: Big,
): Big {
    return assets.margin
        .div(totalPosition)
        .times(volume);
}
function calcMargin(
    config: MarketConfig & AccountConfig,
    assets: Omit<ExAssets, 'margin' | 'reserve'>,
    settlementPrice: Big,
    latestPrice: Big,
    autoMargin: Big,
): Big {
    return autoMargin;
}
```

### 持仓保证金实时更新

OKEX 永续全仓持仓保证金是实时更新的，你在结算价 10000 USD 时 10x 杠杆成功开多 1 BTC，此时你的持仓保证金是 `10000*1/10 = 1000` USD。一段时间后，结算价涨到 12000 USD，此时你的持仓保证金就是 `12000*1/10 = 1200` USD。

Texchange 的持仓保证金也是实时更新的，所以 Texchange 可以模拟 OKEX 永续全仓。

### 冻结保证金不更新

假设有两个这样的衍生品

- 冻结保证金是用最新成交价计算的且实时更新的，你在最新成交价 10000 USD 时 10x 杠杆以 9000 的委托价开多 1 BTC 挂单，此时冻结的保证金是 `10000*1/10 = 1000` USD。一段时间后，最新成交价涨到12000 USD，但你的挂单依然没有成交，此时冻结的保证金就变成了 `12000*1/10 = 1200` USD。
- 冻结保证金是用最新成交价计算的且不更新的，你在最新成交价 10000 USD 时 10x 杠杆以 9000 的委托价开多 1 BTC 挂单，此时冻结的保证金是 `10000*1/10 = 1000` USD。一段时间后，最新成交价涨到12000 USD，但你的挂单依然没有成交，此时冻结的保证金依然是 `10000*1/10 = 1000` USD。

由于 Texchange 的冻结保证金是不更新的，所以无法模拟第一个，只能模拟第二个。

不过问题不大，因为我见过的所有衍生品都是用委托价来计算冻结保证金的。
