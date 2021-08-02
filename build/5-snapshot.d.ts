import { Texchange as Parent, Events } from './4-assets';
import { Snapshot } from './interfaces';
declare class Texchange extends Parent {
    capture(): Snapshot;
}
export { Texchange, Events, };
