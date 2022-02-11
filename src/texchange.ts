import { StatefulLike } from 'startable';
import { Hub } from './hub';
import {
	Config,
	Timeline,
} from './interfaces';

export namespace Texchange {
	export type Snapshot = Hub.Snapshot;
	export type Backup = Hub.Backup;
}

export import Snapshot = Texchange.Snapshot;
export import Backup = Texchange.Backup;

export class Texchange implements StatefulLike<Snapshot, Backup> {
	protected hub: Hub;

	constructor(
		config: Config,
		timeline: Timeline,
	) {
		this.hub = new Hub(config, timeline);
	}

	public capture(): Snapshot {
		return this.hub.capture();
	}

	public restore(backup: Backup): void {
		this.hub.restore(backup);
	}
}
