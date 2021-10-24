import { Startable, ReadyState } from 'startable';
import {
    Config,
    Snapshot,
    ExchangeLike,
    Timeline,
    TypeRecur,
} from './interfaces';
import { StateAssets } from './states/assets';
import { StateMargin } from './states/margin';
import { StateMakers } from './states/makers';
import { StateOrderbook } from './states/orderbook';
import { StateMtmLike, StateMtm } from './states/mtm';
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
import assert = require('assert');


export class Core extends Startable implements ExchangeLike {
    public states: {
        assets: StateAssets;
        margin: StateMargin;
        makers: StateMakers;
        orderbook: StateOrderbook;
        mtm: StateMtmLike<any>;
        misc: StateMisc;
    };
    public interfaces: {
        instant: InterfaceInstant;
        latency: InterfaceLatency;
    }

    public ordering = new MethodsOrdering(this);
    public clearing = new MethodsClearing(this);
    public making = new MethodsMaking(this);
    public taking = new MethodsTaking(this);
    public taken = new MethodsTaken(this);
    public updating = new MethodsUpdating(this);
    public validation = new MethodsValidation(this);
    public calculation = new MethodsCalculation(this);

    constructor(
        public config: Config,
        public timeline: Timeline<any>,
    ) {
        super();
        this.states = {
            assets: new StateAssets(this),
            margin: new StateMargin(this),
            makers: new StateMakers(this),
            orderbook: new StateOrderbook(this),
            mtm: new StateMtm(this),
            misc: new StateMisc(this),
        };
        this.interfaces = {
            instant: new InterfaceInstant(this),
            latency: new InterfaceLatency(this),
        }
    }

    // TODO Snapshot 中的无穷大
    public capture(): Snapshot {
        assert(
            this.readyState === ReadyState.STOPPED ||
            this.readyState === ReadyState.STARTED
        );
        return {
            time: this.timeline.now(),
            assets: this.states.assets.capture(),
            margin: this.states.margin.capture(),
            makers: this.states.makers.capture(),
            misc: this.states.misc.capture(),
            mtm: this.states.mtm.capture(),
            orderbook: this.states.orderbook.capture(),
        }
    }

    public restore(snapshot: TypeRecur<Snapshot, Big, string>): void {
        assert(
            this.readyState === ReadyState.STOPPED ||
            this.readyState === ReadyState.STARTED
        );
        this.states.misc.restore(snapshot.misc);
        this.states.assets.restore(snapshot.assets);
        this.states.margin.restore(snapshot.margin);
        this.states.makers.restore(snapshot.makers);
        this.states.mtm.restore(snapshot.mtm);
        this.states.orderbook.restore(snapshot.orderbook);
    }

    protected async _start() {
        const promises = [this.states.misc.start(this.stop)];
        if (this.states.mtm instanceof Startable)
            promises.push(this.states.mtm.start(this.stop));

        const results = await Promise.allSettled(promises);
        results.forEach(result => {
            if (result.status === 'rejected') throw result.reason;
        });
    }

    protected async _stop() {
        await this.states.misc.stop();
        if (this.states.mtm instanceof Startable)
            await this.states.mtm.stop();
    }
}
