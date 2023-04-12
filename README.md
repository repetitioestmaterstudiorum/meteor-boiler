# meteor-boiler

Meteor Boilerplate based on the todo example app.

## Key Differences

The following are the key differences to the todo react example on https://react-tutorial.meteor.com/simple-todos/:

-   The folder structure is more similar to https://guide.meteor.com/structure.html
-   The new Async API is used: https://guide.meteor.com/2.8-migration.html
-   Roles are set up: https://guide.meteor.com/accounts.html
-   The mongodb-memory-server package is used for testing
-   There is a constants paradigm
-   There is a configuration paradigm
-   Tailwind is used: https://github.com/meteor/examples/tree/main/tailwindcss

## Using This Repo

-   Git clone the project
-   Install MeteorJS: https://docs.meteor.com/install.html
-   `meteor npm i`
-   `npm run dev`

If you use this in production, follow this security guide: https://guide.meteor.com/security.html#checklist

### Updating Packages

-   Meteor: `meteor update`
-   NPM: `npx npm-check-updates -u` and then `npm install`
