import { HLike } from 'secretary-like';
import { Facades } from './facades';
import { UserMarketFacade } from '../facades.d/user-market';
import { UserAccountFacade } from '../facades.d/user-account';
import { AdminFacade } from '../facades.d/admin';
export declare class Texchange<H extends HLike<H>> {
    private facades;
    constructor(facades: Facades<H>);
    getUserMarketFacade(): UserMarketFacade<H>;
    getUserAccountFacade(): UserAccountFacade<H>;
    getAdminFacade(): AdminFacade<H>;
}
