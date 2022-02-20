import { StatefulLike } from 'startable';
export interface ModelLike<Snapshot = unknown, Backup = unknown, Stage = unknown> extends StatefulLike<Snapshot, Backup> {
    stage?: Stage;
    initializeStage(): void;
}
