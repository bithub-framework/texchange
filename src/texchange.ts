import { HLike } from 'secretary-like';
import { inject } from '@zimtsui/injektor';
import { TYPES } from './injection/types';


// Facades
import { UserMarketFacade } from './facades.d/user-market';
import { UserAccountFacade } from './facades.d/user-account';
import { AdminFacade } from './facades.d/admin';


export class Texchange<H extends HLike<H>>  {
	public constructor(
		@inject(TYPES.FACADES.admin)
		private admin: AdminFacade<H>,
		@inject(TYPES.FACADES.userMarket)
		private userMarket: UserMarketFacade<H>,
		@inject(TYPES.FACADES.userAccount)
		private userAccount: UserAccountFacade<H>,
	) { }

	public getUserMarketFacade(): UserMarketFacade<H> {
		return this.userMarket;
	}

	public getUserAccountFacade(): UserAccountFacade<H> {
		return this.userAccount;
	}

	public getAdminFacade(): AdminFacade<H> {
		return this.admin;
	}
}
