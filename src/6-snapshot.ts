import {
    Texchange as Parent,
    Events,
} from './5-margin';
import {
    Snapshot,
    Config,
} from './interfaces';
import { OpenMakerManager } from './state-managers/open-maker-manager';
import { EquityManager } from './state-managers/equity-manager';
import { MarginManager } from './state-managers/margin-manager/main';


class Texchange extends Parent {
    protected makers: OpenMakerManager;
    protected equity: EquityManager;
    protected margin: MarginManager;

    constructor(
        config: Config,
        snapshot: Snapshot,
        now: () => number,
    ) {
        super(config, now);
        this.makers = new OpenMakerManager(
            config,
            snapshot.openMakers,
            () => this.settlementPrice,
            () => this.latestPrice,
        );
        this.equity = new EquityManager(
            config,
            snapshot.equity,
        );
        this.margin = new MarginManager(
            config,
            snapshot.margin,
            () => this.settlementPrice,
            () => this.latestPrice,
            this.equity,
        );
    }

    // TODO 考虑现货
    public capture(): Snapshot {
        return {
            time: this.now(),
            openMakers: this.makers.capture(),
            equity: this.equity.capture(),
            margin: this.margin.capture(),
        };
    }
}

export {
    Texchange,
    Events,
}
