# Texchange

Texchange 是一个专为高频交易设计的回测工具，是一个模拟交易所。

## Advantage

- 高度仿真
    - 可模拟网络延迟
    - 可模拟服务器处理时间
    - 可模拟你的 taker 对盘口的影响
    - 可模拟你的 maker 在盘口相同价格订单中的排队
- 高度可配置
    - 可配置保证金算法
    - 可配置 mark-to-market 结算时间与结算价算法
    - 可配置正反向合约
    - 可配置全仓逐仓
    - 可配置单向持仓模式
    - 可配置锁仓优惠

## Drawbacks

- 只支持一个账户
- 没有模拟你的 maker 对盘口的影响
- 单线程
- 只支持限价单

## Methodology of configurability

### 反向合约

反向合约的本质就是把法币当商品，把商品当计价货币。

为了模拟反向合约，只需自定义将量价映射为成交额的函数。

### 实时保证金

如果浮动盈亏可以用来作为开仓保证金，那么相当于实时结算，将浮动盈亏实时结算到余额中。

### 逐仓

逐仓是指为多空各开一个独立的账户，用来在结算时保存浮动盈亏，无论盈亏，可用余额都是不变的。

模拟逐仓的一种方法是，永不结算浮动盈亏，这样可用余额也是不变的。但这样获取的总余额也不变。

因此采用的方法是，结算时把利润算到保证金中，这样可用余额不变。

### 单向持仓

单向持仓是指平仓单把持仓平完之后，剩下的委托自动转换为反向开仓。

为了模拟单向持仓，可以将 order.operation 始终设置为常数 CLOSE。

单向持仓模式下，所有挂单都按照开仓单来计算冻结的余额，最终在计算可用余额时再抵扣掉。

### 现货

现货相当于将 Length 设置为常数 LONG，杠杆率设置为 1x。

## 配置保证金算法

### 术语定义

不同交易所中各种保证金的名称有差别，这里明确定义 Texchange 文档的术语。

- 持仓保证金 position margin：某个时刻某部分头寸的持仓保证金是指，此时刻此头寸所占用的余额。
- 初始保证金 initial margin：某部分头寸的初始保证金是指，此头寸自出现起到下一次结算前的持仓保证金。
    - 显然，对于实时结算的合约，初始保证金是某头寸出现的一瞬间的持仓保证金。
- 冻结的余额 frozen balance：某个时刻某个开仓订单的冻结的余额是指，此时刻此订单未成交而成为挂单的部分所占用的余额。如果一个订单所需冻结的余额加所需手续费超过可用余额，会导致下单失败。
    - 显然，如果冻结的余额算法和持仓保证金算法不同，有可能出现开仓之后余额立即小于保证金的情况。
- 冻结的头寸 frozen position: 某个时刻某个平仓订单的冻结的头寸是指，此时刻此订单未成交而成为挂单的部分所占用的头寸。

### Mark-to-market 结算周期

有的合约是每个交易日固定时间结算，比如大多数商品期货。有的合约是实时结算，比如很多数字货币合约。

- 芝商所 Globex 玉米期货，芝加哥时间每日 13:15 结算，根据 13:14:00 至 13:15:00 之间这最后一分钟的交易活动确定玉米结算价格。
- Bitmex 永续合约，不 MTM。
- 火币永续合约，虽然名义上是每日结算，但结算前用最新价格计算得出的浮动盈亏可以用来开仓，所以本质上相当于以最新价格作为结算价实时结算。
- Binance 永续合约，虽然名义上是不 MTM，但以标记价格计算得出的浮动盈亏实时计入了余额，所以本质上相当于以标记价格实时结算。
- OKEX 永续合约，虽然名义上是每日结算，但结算前用标记价格计算得出的浮动盈亏可以用来开仓，所以本质上相当于以标记价格作为结算价实时结算。

### 保证金算法

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

OKEX 和火币的保证金算法复杂也就算了，最关键的是文档里居然不写，这些都是我辛辛苦苦找客服一个个问出来的。

### 配置各个保证金算法

Texchange 会在每次开仓和平仓时调用你的 `calcMarginIncrement` 和 `calcMarginDecrement` 计算持仓保证金增量并自动统计，在每次读取持仓保证金时调用你的 `calcMargin` 来修正统计值。

有的衍生品，比如 Binance 永续全仓，持仓保证金是每次开仓平仓时计算并统计出来的，你需要提供 `calcMarginIncrement` 和 `calcMarginDecrement`。而 `calcMargin` 只需要直接输出统计值就行了。

还有的衍生品，比如 OKEX 永续全仓，持仓保证金是用当前结算价直接算出来的，所以你需要提供 `calcMargin`。而 `calcMarginIncrement` 和 `calcMarginDecrement` 随便输出一个数就行，比如 0。

#### 商品期货

```ts
function calcPositionMarginIncrement(): Big {
    return new Big(0);
};
function calcPositionMarginDecrement(): Big {
    return new Big(0);
}
function revisePositionMargin({
    spec: MarketSpec & AccountSpec,
    position: Assets['position'],
    cost: Assets['cost'],
    clearingPrice: Big,
    latestPrice: Big,
    marginSum: Big,
}): Big {
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
