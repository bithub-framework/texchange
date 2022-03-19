import { Models } from './models/models';
import { Context } from './context';
import { Tasks } from './tasks/tasks';
import { Broadcast } from './broadcast';
import { HLike } from 'interfaces';


export abstract class Task<H extends HLike<H>> {
	protected abstract readonly context: Context<H>;
	protected abstract readonly models: Models<H>;
	protected abstract readonly broadcast: Broadcast<H>;
	protected abstract readonly tasks: Tasks<H>;
}
