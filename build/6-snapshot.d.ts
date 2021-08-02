import { Texchange as Parent, Events } from './5-margin.3-others';
import { Snapshot, Config } from './interfaces';
import { OpenMakerManager } from './state-managers/open-maker-manager';
import { EquityManager } from './state-managers/equity-manager';
import { MarginManager } from './state-managers/margin-manager/main';
declare class Texchange extends Parent {
    protected makers: OpenMakerManager;
    protected equity: EquityManager;
    protected margin: MarginManager;
    constructor(config: Config, snapshot: Snapshot, now: () => number);
    capture(): Snapshot;
}
export { Texchange, Events, };
