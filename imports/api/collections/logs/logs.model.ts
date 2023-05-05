import { LogMetaOptional, LogsCollection } from '/imports/api/collections/logs/logs.collection';
import { insert } from '/imports/api/db/db.generic-methods';

// ---

export async function addLog(log: LogMetaOptional): Promise<string> {
	return insert(LogsCollection, log);
}
