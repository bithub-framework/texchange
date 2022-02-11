import { StatefulLike } from 'startable';
import { Hub } from './hub';
import {
	Config,
	Timeline,
} from './interfaces';
import { Latency } from './views/latency';
import { Joystick } from './views/joystick';


export class Texchange implements StatefulLike<Hub.Snapshot, Hub.Backup> {
	protected hub: Hub;
	public user: Latency;
	public admin: Joystick;

	constructor(
		config: Config,
		timeline: Timeline,
	) {
		this.hub = new Hub(config, timeline);
		this.user = this.hub.views.latency;
		this.admin = this.hub.views.joystick;
	}

	public capture(): Hub.Snapshot {
		return this.hub.capture();
	}

	public restore(backup: Hub.Backup): void {
		this.hub.restore(backup);
	}
}
