import { StatefulLike } from 'startable';
import { Context } from '../context';
/**
 * @param Snapshot stringifyable
 */
export declare abstract class Model<Snapshot> implements StatefulLike<Snapshot> {
    protected abstract context: Context;
    abstract capture(): Snapshot;
    abstract restore(backup: Snapshot): void;
}
