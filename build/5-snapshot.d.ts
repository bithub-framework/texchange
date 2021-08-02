import { Texchange as Parent, Events } from './4-assets';
import { Snapshot, Config } from './interfaces';
import { OpenMakerManager } from './state-managers/open-maker-manager';
import { AssetsManager } from './state-managers/assets-manager';
declare class Texchange extends Parent {
    protected makers: OpenMakerManager;
    protected assets: AssetsManager;
    constructor(config: Config, snapshot: Snapshot, now: () => number);
    capture(): Snapshot;
}
export { Texchange, Events, };
