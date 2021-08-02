import {
    Texchange as Parent,
    Events,
} from './4-assets';
import {
    Snapshot,
} from './interfaces';

class Texchange extends Parent {
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
