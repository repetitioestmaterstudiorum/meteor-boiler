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

	// @ts-ignore --> Meteor Mongo has weird types, or I don't know how to use them
	return await collection.insertAsync(documentWithMetaFields)
}

export async function update<T>(
	collection: MeteorMongoCollection<T>,
	selector: MeteorMongoSelector<T>,
	update: WithOptionalMetaFields<T>,
	userId: string
) {
	const timestamp = new Date()

	const updateWithMetaFields = {
		...update,
		updatedAt: timestamp,
		updatedBy: userId,
	}

	return await collection.updateAsync(selector, { $set: updateWithMetaFields })
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

	return await collection.updateAsync(selector, { $set: documentWithMetaFields })
}

export function find<T>(collection: MeteorMongoCollection<T>, selector: MeteorMongoSelector<T>) {
	return collection.find({
		...selector,
		deletedAt: { $exists: false },
	})
}

export async function findOne<T>(
	collection: MeteorMongoCollection<T>,
	selector: MeteorMongoSelector<T>
) {
	return await collection.findOneAsync({
		...selector,
		deletedAt: { $exists: false },
	})
}

export type WithOptionalMetaFields<T> = UnionPartial<WithMetaFields<T>>
export type WithMetaFields<T> = T & MetaFields

export type MeteorMongoCollection<T> = Mongo.Collection<
	WithOptionalMetaFields<T>,
	WithMetaFields<T>
>
export type MeteorMongoSelector<T> = Mongo.Selector<WithOptionalMetaFields<T>>

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
