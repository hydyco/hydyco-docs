---
sidebar_position: 1
title: Server
---

<!-- # Hydyco Core

Hydyco Core exposes all the core and helper methods, that can be used by other modules to create awesome features. -->

Hydyco core server is built on top to express.js framework. It allows us to use all the existing express middleware without changing anything.

## Create your Hydyco Server

```js
const { HydycoServer } = require("@hydyco/core");

const server = new HydycoServer({
  port: 3002, // port to use
  logger: false, // allow logs on terminal
  auth: {
    secretOrKey: "random", // auth module functionality
  },
});
```

## Register your DB

:::danger Important
You cannot run Hydyco Server without registering a Database
:::

```js
const { HydycoMongoose } = require("@hydyco/mongoose-plugin");

const db = HydycoMongoose({
  connectionString: process.env.connectionString,
});

server.registerDatabase(db);
```

This will allow admin to use mongoDB as database to perform operations

## Register Routes

To create routes automatically when you are creating **Collection** on frontend, you need to register that service.

```js
const {
  HydycoRoutes,
  MongooseExpressRoutes,
} = require("@hydyco/mongoose-plugin");

const routes = MongooseExpressRoutes;

server.registerRoutes([HydycoRoutes(routes)]);
```

:::info
You can override routes with custom routes
:::

## Add Global Middleware

You can add **Global Level** middleware in Hydyco Server

```js
const expressip = require("express-ip");

server.registerMiddleware([expressip().getIpInfoMiddleware]);
```

## Start Server

All Set to start your server

```js
server.start();
```
