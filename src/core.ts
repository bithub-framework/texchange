import { Startable } from 'startable';
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
        snapshot?: TypeRecur<Snapshot, Big, string>,
    ) {
        super();
        this.states = {
            assets: new StateAssets(this, snapshot?.assets),
            margin: new StateMargin(this, snapshot?.margin),
            makers: new StateMakers(this, snapshot?.makers),
            orderbook: new StateOrderbook(this, snapshot?.orderbook),
            mtm: new StateMtm(this, snapshot?.mtm),
            misc: new StateMisc(this, snapshot?.misc),
        };
        this.interfaces = {
            instant: new InterfaceInstant(this),
            latency: new InterfaceLatency(this),
        }
    }

    // TODO 允许的时机
    // TODO Snapshot 中的无穷大
    public capture(): Snapshot {
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

    protected async _start() {
        await this.states.misc.start(this.stop);
        await this.states.mtm.start(this.stop);
    }

    protected async _stop() { }
}
