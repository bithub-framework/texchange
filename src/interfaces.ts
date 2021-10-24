export * from 'interfaces';
import {
    Length,
    Trade,
    Orderbook,
    MarketSpec, AccountSpec, MarketCalc,
    ContextMarketApiLike, ContextAccountApiLike,
    MarketEvents, AccountEvents,
} from 'interfaces';
import Big from 'big.js';
import { Snapshot as SnapshotStateMakers } from './states/makers';
import { Snapshot as SnapshotStateAssets } from './states/assets';
import { Snapshot as SnapshotStateMargin } from './states/margin';
import { Snapshot as SnapshotStateOrderbook } from './states/orderbook';
import { Snapshot as SnapshotStateMisc } from './states/misc';


export interface Snapshot {
    time: number;
    makers: SnapshotStateMakers;
    assets: SnapshotStateAssets;
    margin: SnapshotStateMargin;
    mtm: any;
    misc: SnapshotStateMisc;
    orderbook: SnapshotStateOrderbook;
}


export interface DatabaseTrade extends Trade {
    id: string;
}


export interface MarketConfig extends MarketSpec {
    PING: number;
    PROCESSING: number;
}
export interface AccountConfig extends AccountSpec {
    initialBalance: Big;
}
export interface Config extends MarketConfig, AccountConfig {
    marketName: string;
}



export interface StateLike<Snapshot> {
    capture(): Snapshot;
    restore(snapshot: Parsed<Snapshot>): void;
}

export type Events = MarketEvents & AccountEvents;

export interface ApiLike extends ContextMarketApiLike, ContextAccountApiLike {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}

export interface ExchangeLike extends StateLike<Snapshot> {
    interfaces: {
        latency: ApiLike;
    };

    config: MarketSpec & AccountSpec;
    calculation: MarketCalc;
    updating: {
        updateTrades: (trades: DatabaseTrade[]) => void;
        updateOrderbook: (orderbook: Orderbook) => void;
    };
}

export interface Frozen {
    balance: {
        [length: number]: Big;
    };
    position: {
        [length: number]: Big;
    };
}

export namespace Frozen {
    export function plus(x: Frozen, y: Frozen): Frozen {
        return {
            balance: {
                [Length.LONG]: x.balance[Length.LONG].plus(y.balance[Length.LONG]),
                [Length.SHORT]: x.balance[Length.SHORT].plus(y.balance[Length.SHORT]),
            },
            position: {
                [Length.LONG]: x.position[Length.LONG].plus(y.position[Length.LONG]),
                [Length.SHORT]: x.position[Length.SHORT].plus(y.position[Length.SHORT]),
            },
        }
    }
    export function minus(x: Frozen, y: Frozen): Frozen {
        return {
            balance: {
                [Length.LONG]: x.balance[Length.LONG].minus(y.balance[Length.LONG]),
                [Length.SHORT]: x.balance[Length.SHORT].minus(y.balance[Length.SHORT]),
            },
            position: {
                [Length.LONG]: x.position[Length.LONG].minus(y.position[Length.LONG]),
                [Length.SHORT]: x.position[Length.SHORT].minus(y.position[Length.SHORT]),
            },
        }
    }
}

export type TypeRecur<Type, Old, New> =
    Type extends Old
    ? New
    : (
        Type extends {}
        ? { [K in keyof Type]: TypeRecur<Type[K], Old, New> }
        : Type
    );

export type Parsed<T> = TypeRecur<TypeRecur<T, Big, string>, number, number | null>;
