<img src="https://i.imgur.com/yag3jO7.png" title="" alt="" width="129"> <img title="" src="https://i.imgur.com/nC78uQe.png" alt="" width="110">  <img title="" src="https://i.imgur.com/tdvpa99.png" alt="" width="239">

# Introduction

Bootstrap and package your project with Angular ^10 , Electron ^10 and TypeOrm ^0.2.28 (Typescript + SASS + Hot Reload) for creating Desktop applications.

Currently runs with:

- Angular v10.0.14
- Electron v10.1.2
- TypOrm v0.2.28
- Electron Builder v22.8.0

/!\ Only Use these repository if you want to use TypeOrm in your application Other wise use [angular-electron](https://github.com/maximegris/angular-electron)

/!\ Hot reload only pertains to the renderer process. The main electron process is not able to be hot reloaded, only restarted.

/!\ Angular 10.x CLI needs Node 10.13 or later to work correctly.

## Getting Started

Clone this repository locally :

```bash
git clone https://github.com/arslanmughal99/angular-electron-typeorm.git
```

Install dependencies with npm :

```bash
npm install
```

There is an issue with `yarn` and `node_modules` when the application is built by the packager. Please use `npm` as dependencies manager.

If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

```bash
npm install -g @angular/cli
```

## TypeOrm Connection Options

Before starting make sure to provide TypeOrm connection options in `src/app/typeorm.connection.ts`

also make sure to first install correct drivers for your database and then require them in `angular.webpack.js` checkout  `angular.webpack.js` file in the root of the project.

```bash
npm install --save pg # if you are using postgres
```

`angular.webpack.js`

```js
module.exports = (config, options) => {
  config.target = 'electron-renderer';
  config.externals = {
    typeorm: "require('typeorm')",
    // require drivers like below line for you database here e.g: sqlite, sqljs etc ...
    // example:
    pg: "require('pg')",
  };

  config.resolve = {
    alias: {
      // Also make sure to resolve path for your drivers like below
      // example:
      pg: path.resolve(__dirname, "../node_modules/typeorm/pg"),
      typeorm: path.resolve(__dirname, "../node_modules/typeorm/typeorm-model-shim"),
    }
  };

return config;
}
```

## TypeOrm Entities

import all of your entities in `src/app/root.entities.ts`   and add to `exports default []`

```ts
import { User } from "./user/user.entity";

export default [
   User,
];


```

## To build for development

- **in a terminal window** -> npm start

Voila! You can use your Angular + Electron + TypeOrm app in a local development environment with hot reload !

The application code is managed by `main.ts`. In this sample, the app runs with a simple Angular App (http://localhost:4200) and an Electron window.
The Angular component contains an example of Electron and NodeJS native lib import.
You can disable "Developer Tools" by commenting `win.webContents.openDevTools();` in `main.ts`.

## Use Electron / NodeJS / 3rd party libraries

As see in previous chapter, this sample project runs on both mode (web and electron). To make this happens, **you have to import your dependencies the right way**. Please check `providers/electron.service.ts` to watch how conditional import of libraries has to be done when using electron / NodeJS / 3rd party librairies in renderer context (ie. Angular).

## Browser mode

Maybe you only want to execute the application in the browser with hot reload ? Just run `npm run ng:serve:web`.

## Included Commands

| Command                  | Description                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `npm run ng:serve`       | Execute the app in the browser                                                       |
| `npm run build`          | Build the app. Your built files are in the /dist folder.                             |
| `npm run build:prod`     | Build the app with Angular aot. Your built files are in the /dist folder.            |
| `npm run electron:local` | Builds your application and start electron                                           |
| `npm run electron:build` | Builds your application and creates an app consumable based on your operating system |

**Your application is optimised. Only /dist folder and node dependencies are included in the executable.**

## You want to use a specific lib (like rxjs) in electron main thread ?

YES! You can do it! Just by importing your library in npm dependencies section (not **devDependencies**) with `npm install --save`. It will be loaded by electron during build phase and added to your final package. Then use your library by importing it in `main.ts` file. Quite simple, isn't it ?

## E2E Testing

E2E Test scripts can be found in `e2e` folder.

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run e2e` | Execute end to end tests |

Note: To make it work behind a proxy, you can add this proxy exception in your terminal  
`export {no_proxy,NO_PROXY}="127.0.0.1,localhost"`

This angular-electron-typeorm template repository is build on top of [angular-electron](https://github.com/maximegris/angular-electron) so make sure to check that out too . Thanks !
