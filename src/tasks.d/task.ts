import { Models } from '../models';
import { Context } from '../context';
import { Tasks } from '../tasks';

export abstract class Task {
	constructor(
		protected context: Context,
		protected models: Models,
		protected tasks: Tasks,
	) { }
}
