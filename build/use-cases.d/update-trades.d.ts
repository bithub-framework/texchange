import { Context } from '../context';
import { Broadcast } from '../middlewares/broadcast';
import { HLike } from 'secretary-like';
import { DatabaseTrade } from '../interfaces/database-trade';
import { MarginAssets } from '../models.d/margin-assets';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing/pricing';
import { DatabaseTradeHandler } from '../middlewares/database-trade-handler';
export declare class UseCaseUpdateTrades<H extends HLike<H>> {
    private context;
    private marginAssets;
    private progress;
    private pricing;
    private broadcast;
    private databaseTradeHandler;
    private realTimeSettlement;
    constructor(context: Context<H>, marginAssets: MarginAssets<H>, progress: Progress<H>, pricing: Pricing<H, unknown>, broadcast: Broadcast<H>, databaseTradeHandler: DatabaseTradeHandler<H>, realTimeSettlement: boolean);
    updateTrades(trades: DatabaseTrade<H>[]): void;
}
