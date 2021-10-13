import { Startable } from 'startable';
import { Config, Snapshot, ExchangeLike, Timeline, TypeRecur } from './interfaces';
import { StateAssets } from './states/assets';
import { StateMargin } from './states/margin';
import { StateMakers } from './states/makers';
import { StateOrderbook } from './states/orderbook';
import { StateMtmLike } from './states/mtm';
import { StateMisc } from './states/misc';
import { MethodsValidation } from './methods/validation';
import { MethodsOrdering } from './methods/ordering';
import { MethodsClearing } from './methods/clearing';
import { MethodsTaking } from './methods/taking';
import { MethodsTaken } from './methods/taken';
import { MethodsMaking } from './methods/making';
import { MethodsUpdating } from './methods/updating';
import { MethodsCalculation } from './methods/calculation';
import { InterfaceInstant } from './interfaces/instant';
import { InterfaceLatency } from './interfaces/latency';
import Big from 'big.js';
export declare class Core extends Startable implements ExchangeLike {
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
    ordering: MethodsOrdering;
    clearing: MethodsClearing;
    making: MethodsMaking;
    taking: MethodsTaking;
    taken: MethodsTaken;
    updating: MethodsUpdating;
    validation: MethodsValidation;
    calculation: MethodsCalculation;
    constructor(config: Config, timeline: Timeline<any>, snapshot?: TypeRecur<Snapshot, Big, string>);
    capture(): Snapshot;
    protected _start(): Promise<void>;
    protected _stop(): Promise<void>;
}
