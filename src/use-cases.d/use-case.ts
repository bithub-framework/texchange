import { Models } from '../models';
import { Tasks } from '../tasks';
import { Context } from '../context';

export abstract class UseCase {
	constructor(
		protected context: Context,
		protected models: Models,
		protected tasks: Tasks,
	) { }
}
