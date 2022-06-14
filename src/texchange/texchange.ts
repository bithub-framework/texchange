import { HLike } from 'secretary-like';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


// Facades
import { Facades } from './facades';
import { UserMarketFacade } from '../facades.d/user-market';
import { UserAccountFacade } from '../facades.d/user-account';
import { AdminFacade } from '../facades.d/admin';


export class Texchange<H extends HLike<H>>  {
	public constructor(
		@inject(TYPES.Facades)
		private facades: Facades<H>,
	) { }

	public getUserMarketFacade(): UserMarketFacade<H> {
		return this.facades.userMarket;
	}

	public getUserAccountFacade(): UserAccountFacade<H> {
		return this.facades.userAccount;
	}

	public getAdminFacade(): AdminFacade<H> {
		return this.facades.admin;
	}
}
