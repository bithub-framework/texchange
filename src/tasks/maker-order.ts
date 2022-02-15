import { Models } from '../models/models';
import { Context } from '../context/context';
import { Controllers } from '../controllers/controllers';
import {
	LimitOrder,
	OpenOrder,
} from '../interfaces';


type Involved = Pick<
	Models,
	'assets' | 'margin' | 'makers' | 'progress' | 'book'
>;

type Stages = {
	[model in keyof Involved]: boolean;
}

class MakeOrder {
	private stages: Stages = {
		assets: false,
		margin: false,
		makers: false,
		progress: false,
		book: false,
	}

	constructor(
		private context: Context,
		private controllers: Controllers,
	) { }

	public makeOrder(order: Readonly<LimitOrder>): OpenOrder {
		return this.controllers.ordering.makeOrder(order);
	}
}
