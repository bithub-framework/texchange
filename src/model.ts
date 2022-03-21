import { StatefulLike } from 'startable';
import { Context } from './context';
import { HLike } from 'interfaces';


/**
 * @param Snapshot stringifyable
 */
export abstract class Model<H extends HLike<H>, Snapshot>
	implements StatefulLike<Snapshot> {

	protected abstract readonly context: Context<H>;

	public abstract capture(): Snapshot;
	public abstract restore(snapshot: Snapshot): void;
}
