import type { MeteorMongoCollection } from '/imports/api/db/db.generic-methods'

// ---

const defaultIndexSpecs = { createdAt: -1, updatedAt: -1 }

export function createDefaultIndexes<T>(collection: MeteorMongoCollection<T>) {
	collection.createIndexAsync(defaultIndexSpecs)
}
