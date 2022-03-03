import { StatefulLike } from 'startable';
import { Context } from '../context';

export abstract class Model<Snapshot = unknown, Backup = Snapshot>
	implements StatefulLike<Snapshot, Backup> {

	public abstract capture(): Snapshot;
	public abstract restore(backup: Backup): void;

	constructor(
		protected context: Context,
	) { }
}
