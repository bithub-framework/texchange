import { Taking } from './taking';
import { Making } from './making';
import { Taken } from './taken';
import { Mtm } from './mtm';
import { Validation } from './validation';
import { Clearing } from './clearing';
import { AccountView } from './account-view';
import { MakeOpenOrder } from './make-open-order';
import { CancelOpenOrder } from './cancel-open-order';


export interface Controllers {
	accountView: AccountView;
	clearing: Clearing;
	making: Making;
	mtm: Mtm;
	taken: Taken;
	taking: Taking;
	validation: Validation;
	makeOpenOrder: MakeOpenOrder;
	cancelOpenOrder: CancelOpenOrder;
}
