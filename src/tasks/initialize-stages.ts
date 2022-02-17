import { ModelLike } from '../models/model';

export function initializeStages(models: ModelLike[]): void {
	for (const model of models)
		model.initializeStage();
}
