import {
    Assets,
    Length,
    Config,
} from '../interfaces';
import Big from 'big.js';

export interface AssetsSnapshot {
    position: {
        [length: number]: Big;
    };
    balance: Big;
    cost: {
        [length: number]: Big;
    };
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    staticMargin: Big;
}

export function makeEmptyAssetsSnapshot(balance: Big): AssetsSnapshot {
    return {
        position: {
            [Length.LONG]: new Big(0),
            [Length.SHORT]: new Big(0),
        },
        frozenPosition: {
            [Length.LONG]: new Big(0),
            [Length.SHORT]: new Big(0),
        },
        cost: {
            [Length.LONG]: new Big(0),
            [Length.SHORT]: new Big(0),
        },
        frozenBalance: new Big(0),
        staticMargin: new Big(0),
        balance,
    }
}



export class AutoAssets implements Assets {
    public position: {
        [length: number]: Big;
    };
    public balance: Big;
    public cost: {
        [length: number]: Big;
    };
    public frozenBalance: Big;
    public frozenPosition: {
        [length: number]: Big;
    };

    constructor(
        protected config: Config,
        snapshot: AssetsSnapshot,
        private getSettlementPrice: () => Big,
        private getLatestPrice: () => Big,
    ) {
        this.balance = new Big(snapshot.balance);
        this.frozenBalance = new Big(snapshot.frozenBalance);
        this.frozenPosition = {
            [Length.LONG]: new Big(snapshot.frozenPosition[Length.LONG]),
            [Length.SHORT]: new Big(snapshot.frozenPosition[Length.SHORT]),
        };
        this.position = {
            [Length.LONG]: new Big(snapshot.position[Length.LONG]),
            [Length.SHORT]: new Big(snapshot.position[Length.SHORT]),
        };
        this.cost = {
            [Length.LONG]: new Big(snapshot.cost[Length.LONG]),
            [Length.SHORT]: new Big(snapshot.cost[Length.SHORT]),
        };
        this.marginSum = new Big(snapshot.staticMargin);
    }

    public capture(): AssetsSnapshot {
        return {
            position: this.position,
            cost: this.cost,
            frozenPosition: this.frozenPosition,
            frozenBalance: this.frozenBalance,
            staticMargin: this.marginSum,
            balance: this.balance,
        };
    }

    public marginSum;
    public get margin(): Big {
        return this.config.reviseMargin({
            spec: this.config,
            position: this.position,
            cost: this.cost,
            settlementPrice: this.getSettlementPrice(),
            latestPrice: this.getLatestPrice(),
            marginSum: this.marginSum,
        }).round(this.config.CURRENCY_DP);
    }

    public get available(): Big {
        return this.balance
            .minus(this.margin)
            .minus(this.frozenBalance);
    }

    public get closable() {
        return {
            [Length.LONG]: this.position[Length.LONG]
                .minus(this.frozenPosition[Length.LONG]),
            [Length.SHORT]: this.position[Length.SHORT]
                .minus(this.frozenPosition[Length.SHORT]),
        };
    }

    public toJSON(): Assets {
        return {
            balance: this.balance,
            cost: this.cost,
            margin: this.margin,
            position: this.position,
            frozenBalance: this.frozenBalance,
            frozenPosition: this.frozenPosition,
            available: this.available,
            closable: this.closable,
        }
    }
}
