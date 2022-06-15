import { UserMarketFacade } from '../facades.d/user-market';
import { UserAccountFacade } from '../facades.d/user-account';
import { AdminFacade } from '../facades.d/admin';
import { HLike } from 'secretary-like';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class Facades<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.FACADES.admin)
		public admin: AdminFacade<H>,
		@inject(TYPES.FACADES.userMarket)
		public userMarket: UserMarketFacade<H>,
		@inject(TYPES.FACADES.userAccount)
		public userAccount: UserAccountFacade<H>,
	) { }
}
