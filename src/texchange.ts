import { StatefulLike } from 'startable';
import { Hub } from './hub';
import {
	Config,
	Timeline,
	TypeRecur,
} from './interfaces';
import { Latency } from './views/latency';
import { Joystick } from './views/joystick';
import Big from 'big.js';


export class Texchange implements StatefulLike<Snapshot, Backup> {
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

	public capture(): Snapshot {
		return this.hub.capture();
	}

	public restore(backup: Backup): void {
		this.hub.restore(backup);
	}
}

type Snapshot = any;
type Backup = TypeRecur<Snapshot, Big, string>;
