import { Startable } from 'startable';
import { Config, Timeline, Parsed, StateLike, ApiLike, MarketSpec, AccountSpec, MarketCalc, DatabaseTrade, Orderbook } from './interfaces';
import { StateAssets } from './states/assets';
import { StateMargin } from './states/margin';
import { StateMakers } from './states/makers';
import { StateOrderbook } from './states/orderbook';
import { StateMtmLike } from './states/mtm';
import { StateMisc } from './states/misc';
import { MethodsValidation } from './methods/validation';
import { MethodsClearing } from './methods/clearing';
import { MethodsTaking } from './methods/taking';
import { MethodsTaken } from './methods/taken';
import { MethodsMaking } from './methods/making';
import { MethodsUpdating } from './methods/updating';
import { MethodsCalculation } from './methods/calculation';
import { InterfaceInstant } from './interfaces/instant';
import { InterfaceLatency } from './interfaces/latency';
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
export interface TexchangeLike extends StateLike<Snapshot> {
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
export declare class Core extends Startable implements TexchangeLike {
    config: Config;
    timeline: Timeline<any>;
    states: {
        assets: StateAssets;
        margin: StateMargin;
        makers: StateMakers;
        orderbook: StateOrderbook;
        mtm: StateMtmLike<any>;
        misc: StateMisc;
    };
    interfaces: {
        instant: InterfaceInstant;
        latency: InterfaceLatency;
    };
    clearing: MethodsClearing;
    making: MethodsMaking;
    taking: MethodsTaking;
    taken: MethodsTaken;
    updating: MethodsUpdating;
    validation: MethodsValidation;
    calculation: MethodsCalculation;
    constructor(config: Config, timeline: Timeline<any>);
    capture(): Snapshot;
    restore(snapshot: Parsed<Snapshot>): void;
    protected _start(): Promise<void>;
    protected _stop(): Promise<void>;
}
