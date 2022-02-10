import { StatefulLike } from 'startable';
import { Hub } from './hub';
import {
	Config,
	Timeline,
	TypeRecur,
} from './interfaces';
import Big from 'big.js';

export namespace Texchange {
	export interface Snapshot extends Hub.Snapshot { }

	export type Backup = TypeRecur<Snapshot, Big, string>;
}

export import Snapshot = Texchange.Snapshot;
export import Backup = Texchange.Backup;

abstract class Texchange implements StatefulLike<Snapshot, Backup> {
	protected abstract hub: Hub;

	constructor(
		private config: Config,
		private timeline: Timeline,
	) { }

	public capture(): Snapshot {
		return this.hub.capture();
	}

	public restore(backup: Backup): void {
		this.hub.restore(backup);
	}
}
