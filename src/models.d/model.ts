import { StatefulLike } from 'startable';
import { Context } from '../context';


/**
 * @param Snapshot stringifyable
 */
export abstract class Model<Snapshot>
	implements StatefulLike<Snapshot> {

	protected abstract context: Context;

	public abstract capture(): Snapshot;
	public abstract restore(backup: Snapshot): void;
}
