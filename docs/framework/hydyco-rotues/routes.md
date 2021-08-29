---
sidebar_position: 1
title: Routes
---

**Hydyco Routes** allow us to override core Routes functionality

## How it works ?

Hydyco Routes are set of express routes which provides all the crud operations by default

These routes can be defined from **[admin panel](/docs/admin/core/collectoins#create-new-schema)**, which will tell Hydyco to generate allowed routes.

`MongooseExpress` class is used under the hood to generate routes for **[Hydyco Server](/docs/framework/hydyco-core/server)**

## Generating routes manually

If you want to register routes manually you can do something like thing
and pass on to **[Hydyco Server Routes](/docs/framework/hydyco-core/server#register-routes)**

```js
const cart = new MongooseExpress("cart");

server.registerRoutes([cart]);
```

## Main Methods

:::info
Methods can be managed from **[admin panel](/docs/admin/core/collectoins#create-new-schema)**
:::

| Params               | Description                                        |
| :------------------- | :------------------------------------------------- |
| request              | express request, includes **methodCall**           |
| response             | express response                                   |
| next                 | express next function, to forward the request call |
| MongooseModel        | working mongoose model                             |
| HelperMongooseModels | helper mongoose models                             |

### list

List out all the data

```js
list(request, response, mongooseModel, [helperMongooseModel]);
```

### create

Create data

```js
create(request, response, mongooseModel, [helperMongooseModel]);
```

### read

Read data

```js
read(request, response, mongooseModel, [helperMongooseModel]);
```

### update

Update data

```js
update(request, response, mongooseModel, [helperMongooseModel]);
```

### delete

Delete data

```js
delete (request, response, mongooseModel, [helperMongooseModel]);
```

### deleteAll

Delete all data

```js
deleteAll(request, response, mongooseModel, [helperMongooseModel]);
```

All methods except same arguments

```js
// complete example
 async read(req, res, Cart, [CartItem]) {
    try {
      const cart = await Cart.findById(req.params.id).lean();
      const cartItems = await CartItem.find({
        cart: cart._id,
        orderPlaced: false,
      }).lean();
      cart.items = cartItems;
      return res.send({ cart });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  }
```

## Route Helper Methods

### before

`before method` runs before every request. Before can be treated as pre middleware that will get execute before every request made in `HydycoRoutes`.

:::info
`request` has special attribute **methodCall** - which is basically the current method which will get executed, rest remains the same
:::

| Params               | Description                                        |
| :------------------- | :------------------------------------------------- |
| request              | express request, includes **methodCall**           |
| response             | express response                                   |
| next                 | express next function, to forward the request call |
| MongooseModel        | working mongoose model                             |
| HelperMongooseModels | helper mongoose models                             |

```js
  async before(req, res, next, MongooseModel,[helperModel]) {
    if (req.methodCall === "update") {
      if (req.body.count === 0) {
        await MongooseModel.findByIdAndDelete(req.params.id);
        return res.send({ status: true, message: "Item Removed" });
      }
      return next();
    }
    if (req.methodCall === "create") {
      req.body.orderPlaced = false;
      return next();
    }

    if (req.methodCall === "list") {
      req.query.filter.orderPlaced = false;
      return next();
    }

    next();
  }
```

### after

`after method` runs after every request. After can be treated as post middleware that will get executed after every request is completed in `HydycoRoutes`.

:::info
`request` has special attribute **methodCall** - which is basically the current method which will get executed, rest remains the same
:::

| Params   | Description                              |
| :------- | :--------------------------------------- |
| result   | Result returned by every method          |
| request  | express request, includes **methodCall** |
| response | express response                         |

```js
  after(result, request, response) {
    if (request.methodCall === "list") {
      if (result.length) {
        result = result[0];
      } else result = null;
    }

    return response.send(result);
  }
```

:::info Important
after method always expect a **return** statement
:::

## Custom Routes

You can add custom routes if required

```js
const { MongooseExpress } = require("@hydyco/mongoose-plugin");

class CartRoutes extends MongooseExpress {
  constructor() {
    super("cart");
  }

  customRoutes(router, defaultPath, model, helperModels) {
    router.get(defaultPath + "/custom", async (request, response) => {
      const result = await model.find({});
      return response.send(result);
    });
    return router;
  }
}

module.exports = new CartRoutes();
```

:::danger Important

Custom Routes method always expect router as return

:::

## Adding Route Middleware

You can add middleware specific to methods,

```js
const cart = new MongooseExpress("cart");

// single
cart.addMiddleware("list", (req, res, next) => {
  next();
});

// multiple
cart.addMiddleware("list", [
  (req, res, next) => {
    next();
  },
]);
```

## Override complete example

```js
const { MongooseExpress, HydycoModel } = require("@hydyco/mongoose-plugin");

const UserProfile = new HydycoModel("userProfile").mongooseModel();

class UserRoutes extends MongooseExpress {
  constructor() {
    super("user", ["userProfile"]);
  }

  // before method
  async before(request, response, next, User, [UserProfile]) {
    const { methodCall } = request;

    if (methodCall === "create") {
      if (request.body && request.body.email && request.body.password) {
        return next();
      } else {
        return response.send({ status: false, message: "Data missing" });
      }
    } else {
      return next();
    }
  }

  // after method
  async after(result, request, response) {
    const { methodCall } = request;

    if (methodCall === "create") {
      await UserProfile.create({ userId: result._id });
    }

    return response.send(result);
  }

  // override default read method
  read(request, response, User, [UserProfile]) {
    try {
      const user = await User.find({});
      const userProfile = await UserProfile.findOne({ userId: user._id });
      return response.send({ users, userProfile });
    } catch (error) {
      return response.send({ status: false, message: error.message });
    }
  }
}

const userRoutes = new UserRoutes();

// adding middleware
userRoutes.addMiddleware("list", (req, res, next) => {
  console.log("In list method");
});

module.exports = userRoutes;
```
