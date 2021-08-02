import {
    Texchange as Parent,
    Events,
} from './4-assets';
import {
    Snapshot,
    Config,
} from './interfaces';
import { OpenMakerManager } from './state-managers/open-maker-manager';
import { AssetsManager } from './state-managers/assets-manager';


class Texchange extends Parent {
    protected makers: OpenMakerManager;
    protected assets: AssetsManager;

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
        this.assets = new AssetsManager(
            config,
            snapshot.assets,
            () => this.settlementPrice,
            () => this.latestPrice,
        );
    }

    // TODO 考虑现货
    public capture(): Snapshot {
        return {
            time: this.now(),
            openMakers: this.makers.capture(),
            assets: this.assets.capture(),
        };
    }
}

export {
    Texchange,
    Events,
}
