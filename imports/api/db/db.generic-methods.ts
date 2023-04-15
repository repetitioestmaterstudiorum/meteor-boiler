import { Mongo } from 'meteor/mongo'

// ---

export async function insert<T>(collection: MeteorMongoCollection<T>, document: T, userId: string) {
	const timestamp = new Date()

	const documentWithMetaFields = {
		...document,
		createdAt: timestamp,
		createdBy: userId,
		updatedAt: timestamp,
		updatedBy: userId,
	}

	// @ts-ignore --> Meteor Mongo insertAsync has weird types, or I don't know how to use them
	return await collection.insertAsync(documentWithMetaFields)
}

export async function update<T>(
	collection: MeteorMongoCollection<T>,
	selector: MeteorMongoSelector<T>,
	update: WithOptionalMetaFields<T>,
	userId: string,
	options: UpdateOptions = {}
) {
	const timestamp = new Date()

	const updateWithMetaFields = {
		...update,
		updatedAt: timestamp,
		updatedBy: userId,
	}

	return await collection.updateAsync(selector, { $set: updateWithMetaFields }, options)
}

export async function remove<T>(
	collection: MeteorMongoCollection<T>,
	selector: MeteorMongoSelector<T>,
	userId: string
) {
	const timestamp = new Date()

	const documentWithMetaFields = {
		deletedAt: timestamp,
		deletedBy: userId,
	}

	return await collection.updateAsync(selector, { $set: documentWithMetaFields }, { multi: true })
}

export function find<T>(
	collection: MeteorMongoCollection<T>,
	selector: MeteorMongoSelector<T>,
	options: FindOptions = {}
) {
	return collection.find(
		{
			...selector,
			deletedAt: { $exists: false },
		},
		options
	)
}

export async function findOne<T>(
	collection: MeteorMongoCollection<T>,
	selector: MeteorMongoSelector<T>,
	options: FindOptions = {}
) {
	return await collection.findOneAsync(
		{
			...selector,
			deletedAt: { $exists: false },
		},
		options
	)
}

export type WithOptionalMetaFields<T> = UnionPartial<WithMetaFields<T>>
export type WithMetaFields<T> = T & MetaFields

export type MeteorMongoCollection<T> = Mongo.Collection<
	WithOptionalMetaFields<T>,
	WithMetaFields<T>
>
export type MeteorMongoSelector<T> = Mongo.Selector<WithOptionalMetaFields<T>>

// This is a simplified version of the find options type from meteor/mongo
// Unfortunately, the original type is not exported, so we can't use it directly
export type FindOptions = {
	/** Sort order (default: natural order) */
	sort?: Record<string, any> | undefined
	/** Number of results to skip at the beginning */
	skip?: number | undefined
	/** Maximum number of results to return */
	limit?: number | undefined
	/** Dictionary of fields to return or exclude. */
	fields?: { [id: string]: number } | undefined
	/** (Server only) Overrides MongoDB's default index selection and query optimization process. Specify an index to force its use, either by its name or index specification. */
	hint?: string | Document | undefined
	/** (Client only) Default `true`; pass `false` to disable reactivity */
	reactive?: boolean | undefined
	// transform() was removed because
}

// This is a copy of the update options type from meteor/mongo
// Unfortunately, the original type is not exported, so we can't use it directly
export type UpdateOptions = {
	/** True to modify all matching documents; false to only modify one of the matching documents (the default). */
	multi?: boolean | undefined
	/** True to insert a document if no matching documents are found. */
	upsert?: boolean | undefined
	/**
	 * Used in combination with MongoDB [filtered positional operator](https://docs.mongodb.com/manual/reference/operator/update/positional-filtered/) to specify which elements to
	 * modify in an array field.
	 */
	arrayFilters?: { [identifier: string]: any }[] | undefined
}

type MetaFields = {
	_id: string
	createdAt: Date
	createdBy: string
	updatedAt: Date
	updatedBy: string
	deletedAt?: Date
	deletedBy?: string
}

type UnionPartial<T> = { [P in keyof T]?: T[P] | UnionPartial<T[P]> }
