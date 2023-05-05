# meteor-boiler

Meteor Boilerplate based on the todo example app.

## Key Differences

The following are the key differences to the todo react example on https://react-tutorial.meteor.com/simple-todos/:

-   [x] The folder structure is more similar to https://guide.meteor.com/structure.html
-   [x] The new Async API is used: https://guide.meteor.com/2.8-migration.html
    -   Except for fetch and count on the client\*
-   [x] Index Management in collection documents
-   [x] Custom generic collection functions (insert, update, ...) that automatically handle some meta fields
-   [x] Models per collection
-   [ ] Schema enforcement: I will wait until it's possible to create a schema from a TS type/interface in zod: https://github.com/colinhacks/zod/discussions/1928
-   [x] Roles are set up: https://guide.meteor.com/accounts.html#roles-and-permissions
-   [x] There is a constants paradigm
-   [x] There is a settings paradigm
-   [ ] Logging
-   [ ] Tailwind is used: https://github.com/meteor/examples/tree/main/tailwindcss

What's still missing:

-   Schema (as documented above)
-   Error service
-   Migrations solution
-   Dependency injection container
-   Tests

## Using This Repo

-   Git clone the project
-   Install MeteorJS: https://docs.meteor.com/install.html
-   `meteor npm i`
-   `npm run dev`

If you use this in production, follow this security guide: https://guide.meteor.com/security.html#checklist

### Updating Packages

-   Meteor: `meteor update`
-   NPM: `npx npm-check-updates -u` and then `npm install`

## Testing

-   Not implemented yet. Recommended route: [meteormocha](https://github.com/Meteor-Community-Packages/meteor-mocha)

## Takeaways

-   I was thinking about implementing a dependency injection container, but it does not integrate with Meteor's philosophy of using the same code on the client and server well
-   Testing any code that relies on Meteor code is only possible with a framework that supports Meteor, which restricts the options a lot. A dependency injection container would help with this
-   The types of the Mongo package of Meteor are not great, in my opinion. Some useful types are not exported, and I think some of the types are not correct. However, I am not a TS expert, so I might be wrong about this. I just remember implementing custom collection and db classes for the nodejs mongodb driver, and it was a breeze in comparison to the Meteor Mongo package
-   The async API to call Meteor methods async (callAsync) works, but is not typesafe, which requires extra code. Additionally, see the comment (\*) below
-   Meteor's default way of working with collections on the frontend is to use the collections directly. E.g. TasksCollection.find({}). In my opinion, it is not a good idea to use collections directly. On both the client and server, there should be functions that wrap CRUD operations. This way, the code is more maintainable and it's easier to test it. However, it's not easy to get around this because both Meteor methods and CRUD operations are supposed to run isomorphically. It's really nice for free optimistic UI, but it's also not nice because not all code should be the same on the client and server, such as wrappers for CRUD operations

\*According to https://github.com/meteor/react-packages/tree/master/packages/react-meteor-data, there is a new version of useTracker that works with React Suspense. However, 'meteor/react-meteor-data/suspense' is not available on the newest package version as of today. This new version of useTracker would allos fetchAsync and countAsync to be used on the client.
