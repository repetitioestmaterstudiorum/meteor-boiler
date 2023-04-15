# meteor-boiler

Meteor Boilerplate based on the todo example app.

## Key Differences

The following are the key differences to the todo react example on https://react-tutorial.meteor.com/simple-todos/:

-   [x] The folder structure is more similar to https://guide.meteor.com/structure.html
-   [x] The new Async API is used: https://guide.meteor.com/2.8-migration.html
    -   Except on the client (react-meteor-data does not work properly with the new API yet\*)
-   [ ] Roles are set up: https://guide.meteor.com/accounts.html
-   [ ] There is a constants paradigm
-   [ ] There is a configuration paradigm
-   [ ] Tailwind is used: https://github.com/meteor/examples/tree/main/tailwindcss

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

*   According to https://github.com/meteor/react-packages/tree/master/packages/react-meteor-data, there is a new version of useTracker that works with React Suspense. However, 'meteor/react-meteor-data/suspense' is not available on the newest package version as of today. This new version of useTracker would allos fetchAsync and countAsync to be used on the client.
