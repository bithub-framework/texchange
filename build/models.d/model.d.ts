import { StatefulLike } from 'startable';
import { Context } from '../context';
export declare abstract class Model<Snapshot = unknown, Backup = Snapshot> implements StatefulLike<Snapshot, Backup> {
    protected context: Context;
    abstract capture(): Snapshot;
    abstract restore(backup: Backup): void;
    constructor(context: Context);
}
