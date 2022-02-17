import { Taking } from './taking';
import { Making } from './making';
import { Taken } from './taken';
import { Mtm } from './mtm';
import { Validation } from './validation';
import { Ordering } from './ordering';
import { Clearing } from './clearing';
import { AccountView } from './account-view';
export interface Controllers {
    accountView: AccountView;
    clearing: Clearing;
    making: Making;
    mtm: Mtm;
    ordering: Ordering;
    taken: Taken;
    taking: Taking;
    validation: Validation;
}
