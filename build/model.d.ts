import { StatefulLike } from 'startable';
import { Context } from './context';
import { HLike } from 'interfaces';
/**
 * @param Snapshot stringifyable
 */
export declare abstract class Model<H extends HLike<H>, Snapshot> implements StatefulLike<Snapshot> {
    protected abstract readonly context: Context<H>;
    abstract capture(): Snapshot;
    abstract restore(snapshot: Snapshot): void;
}
