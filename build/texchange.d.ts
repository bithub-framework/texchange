import { HLike } from 'secretary-like';
import { UserMarketFacade } from './facades.d/user-market';
import { UserAccountFacade } from './facades.d/user-account';
import { AdminFacade } from './facades.d/admin';
export declare class Texchange<H extends HLike<H>> {
    private admin;
    private userMarket;
    private userAccount;
    constructor(admin: AdminFacade<H>, userMarket: UserMarketFacade<H>, userAccount: UserAccountFacade<H>);
    getUserMarketFacade(): UserMarketFacade<H>;
    getUserAccountFacade(): UserAccountFacade<H>;
    getAdminFacade(): AdminFacade<H>;
}
