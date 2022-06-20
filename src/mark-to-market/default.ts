import { Mtm } from './mtm';
import { HLike } from 'secretary-like';

import { injextends } from '@zimtsui/injektor';



// 默认永不结算
@injextends()
export class DefaultMtm<H extends HLike<H>> extends Mtm<H> {
	protected async rawStart(): Promise<void> { }
	protected async rawStop(): Promise<void> { }
}

export namespace DefaultMtm {
	export interface ModelDeps<H extends HLike<H>>
		extends Mtm.ModelDeps<H> { }
	export const ModelDeps = {};
	export interface TaskDeps<H extends HLike<H>>
		extends Mtm.TaskDeps<H> { }
	export const TaskDeps = {};
}
