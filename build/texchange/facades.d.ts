import { UserMarketFacade } from '../facades.d/user-market';
import { UserAccountFacade } from '../facades.d/user-account';
import { AdminFacade } from '../facades.d/admin';
import { HLike } from 'secretary-like';
export declare class Facades<H extends HLike<H>> {
    admin: AdminFacade<H>;
    userMarket: UserMarketFacade<H>;
    userAccount: UserAccountFacade<H>;
    constructor(admin: AdminFacade<H>, userMarket: UserMarketFacade<H>, userAccount: UserAccountFacade<H>);
}
