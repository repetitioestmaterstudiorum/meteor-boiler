import { LogMetaOptional, LogsCollection } from '/imports/api/collections/logs/logs.collection';
import { insert } from '../../db/db.generic-functions';

// ---

export async function addLog(log: LogMetaOptional): Promise<string> {
	return insert(LogsCollection, log);
}
