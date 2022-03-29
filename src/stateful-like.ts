export interface StatefulLike<Snapshot> {
	capture(): Snapshot;
	restore(snapshot: Snapshot): void;
}
