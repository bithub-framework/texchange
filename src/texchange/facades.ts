import { UserMarketFacade } from '../facades.d/user-market';
import { UserAccountFacade } from '../facades.d/user-account';
import { AdminFacade } from '../facades.d/admin';
import { HLike } from 'secretary-like';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class Facades<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.FACADES.Admin)
		public admin: AdminFacade<H>,
		@inject(TYPES.FACADES.UserMarket)
		public userMarket: UserMarketFacade<H>,
		@inject(TYPES.FACADES.UserAccount)
		public userAccount: UserAccountFacade<H>,
	) { }
}
