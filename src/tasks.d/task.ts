import { Models } from '../models';
import { Context } from '../context';
import { Tasks } from '../tasks';
import { Broadcast } from '../broadcast';

export abstract class Task {
	protected abstract context: Context;
	protected abstract models: Models;
	protected abstract broadcast: Broadcast;
	protected abstract tasks: Tasks;
}
