import { Models } from '../models';
import { Tasks } from '../tasks';
import { Context } from '../context';

export abstract class UseCase {
	protected abstract context: Context;
	protected abstract models: Models;
	protected abstract tasks: Tasks;
}
