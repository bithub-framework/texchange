import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { HLike } from 'interfaces';


export abstract class MarketCalc<H extends HLike<H>> {
	protected abstract readonly context: Context<H>;
	protected abstract readonly models: MarketCalc.ModelDeps<H>;
	protected abstract readonly broadcast: Broadcast<H>;
	protected abstract readonly tasks: MarketCalc.TaskDeps<H>;

	public abstract quantity(price: H, dollarVolume: H): H;
	public abstract dollarVolume(price: H, quantity: H): H;
}


export namespace MarketCalc {
	export interface ModelDeps<H extends HLike<H>> { }

	export interface TaskDeps<H extends HLike<H>> { }
}
