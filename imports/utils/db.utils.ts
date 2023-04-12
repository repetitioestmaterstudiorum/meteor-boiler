import { Mongo, MongoInternals } from 'meteor/mongo'
import { MongoMemoryServer } from 'mongodb-memory-server'

// ---

export function getCollectionByName(name: string) {
	if (Meteor.isTest) {
		console.log('IN TEST MODE')
		const uri = getMongoMemoryServerUri()
		const db = new MongoInternals.RemoteCollectionDriver(uri)
		return new Mongo.Collection(name, { _driver: db })
	}
	return new Mongo.Collection(name)
}

async function getMongoMemoryServerUri() {
	const mongod = await MongoMemoryServer.create()
	const uri = mongod.getUri()
	console.log(`MongoMemoryServer uri: ${uri}`)
	return uri
}
